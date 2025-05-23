import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Star, AlertCircle } from "lucide-react";

interface Comment {
  id: string;
  user: string;
  text: string;
  rating: number;
  reported: boolean;
}

const EventCommentSection: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: "Fatma B.",
      text: "Super ambiance et bon son 💥",
      rating: 5,
      reported: false,
    },
    {
      id: "2",
      user: "Ahmed K.",
      text: "Trop de monde, mais j’ai kiffé",
      rating: 4,
      reported: false,
    },
  ]);

  const handleSubmit = () => {
    if (text.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now().toString(),
          user: "Vous",
          text,
          rating,
          reported: false,
        },
      ]);
      setText("");
      setRating(0);
    }
  };

  const handleReport = (id: string) => {
    setComments(
      comments.map((comment) =>
        comment.id === id ? { ...comment, reported: true } : comment
      )
    );
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4 space-y-4">
      <h2 className="text-lg font-semibold">Avis & Commentaires</h2>

      {/* Liste des avis */}
      <div className="space-y-3">
        {comments.map((comment) => (
          <Card
            key={comment.id}
            className="p-3 rounded-xl bg-white/70 shadow space-y-2"
          >
            <div className="flex items-center gap-2 text-sm font-medium justify-between">
              <span>{comment.user}</span>
              <span className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < comment.rating ? "currentColor" : "none"}
                    className="ml-0.5"
                  />
                ))}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{comment.text}</p>

            {/* Bouton Signaler visible uniquement si ce n'est pas "Vous" */}
            {comment.user !== "Vous" && !comment.reported && (
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() => handleReport(comment.id)}
              >
                <AlertCircle className="w-4 h-4 mr-1" /> Signaler
              </Button>
            )}
            {comment.reported && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={14} /> Signalé
              </p>
            )}
          </Card>
        ))}
      </div>

      {/* Formulaire d’ajout */}
      <div className="space-y-2">
        <Label>Note</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((num) => (
            <Star
              key={num}
              size={20}
              className={`cursor-pointer ${
                num <= rating ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => setRating(num)}
              fill={num <= rating ? "currentColor" : "none"}
            />
          ))}
        </div>

        <Label>Votre commentaire</Label>
        <Textarea
          placeholder="Exprimez votre avis..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={handleSubmit} disabled={!text.trim()}>
          Envoyer
        </Button>
      </div>
    </div>
  );
};

export default EventCommentSection;
