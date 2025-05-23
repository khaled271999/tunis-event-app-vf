import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface Comment {
  id: string;
  event: string;
  user: string;
  text: string;
  rating: number;
  reported: boolean;
}

const mockComments: Comment[] = [
  {
    id: "1",
    event: "Hackathon 2024",
    user: "Sarra B.",
    text: "Trop bruyant mais bien organisé",
    rating: 3,
    reported: false,
  },
  {
    id: "2",
    event: "Festival musique",
    user: "Ali Z.",
    text: "Public irrespectueux 🤬",
    rating: 1,
    reported: true,
  },
  {
    id: "3",
    event: "Atelier IA",
    user: "Mehdi T.",
    text: "Contenu enrichissant !",
    rating: 5,
    reported: false,
  },
];

const AdminCommentModeration = () => {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [onlyReported, setOnlyReported] = useState(false);

  const handleDelete = (id: string) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  const handleToggleReport = (id: string) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, reported: !c.reported } : c))
    );
  };

  const filteredComments = onlyReported
    ? comments.filter((c) => c.reported)
    : comments;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Modération des Commentaires</h1>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="filterReported"
          checked={onlyReported}
          onChange={() => setOnlyReported(!onlyReported)}
          className="accent-red-600"
        />
        <label htmlFor="filterReported" className="text-sm">
          Afficher uniquement les signalés
        </label>
      </div>

      {/* Liste en cartes uniquement (mobile) */}
      <div className="space-y-3">
        {filteredComments.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aucun commentaire à afficher.
          </p>
        ) : (
          filteredComments.map((comment) => (
            <Card key={comment.id} className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-medium">{comment.event}</h2>
                {comment.reported && (
                  <Badge variant="destructive">Signalé</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{comment.user}</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < comment.rating ? "text-yellow-500" : "text-gray-300"
                    }
                    fill={i < comment.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <p className="text-sm">{comment.text}</p>
              <div className="flex gap-2 pt-2 justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleToggleReport(comment.id)}
                >
                  {comment.reported ? "Annuler" : "Signaler"}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(comment.id)}
                >
                  Supprimer
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminCommentModeration;
