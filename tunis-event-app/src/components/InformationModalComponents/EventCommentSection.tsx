import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Star, AlertCircle, Trash2 } from "lucide-react";
import { CommentsService } from "@/api-sdk-backend";
import { withAuth } from "@/hooks/withAuth";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface Comment {
  id: string;
  user: { id: string; name: string };
  content: string;
  rating: number;
  reported: boolean;
}

interface Props {
  eventId: string;
}

const EventCommentSection: React.FC<Props> = ({ eventId }) => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data =
          await CommentsService.commentControllerGetAllCommentsForEvent(
            eventId
          );
        setComments(data);
      } catch (error) {
        console.error("Erreur lors du chargement des commentaires", error);
      }
    };

    if (eventId) fetchComments();
  }, [eventId]);

  const handleSubmit = async () => {
    if (!text.trim() && rating === 0) return;

    if (!user) {
      toast.warning("Vous devez être connecté pour laisser un commentaire.");
      return;
    }

    try {
      const newComment = await withAuth(() =>
        CommentsService.commentControllerCreateComment(eventId, {
          content: text,
          rating,
        })
      );
      setComments([...comments, newComment]);
      setText("");
      setRating(0);
      toast.success("Commentaire ajouté !");
    } catch (error) {
      toast.error("Erreur lors de l'envoi du commentaire");
      console.error("Erreur lors de l'envoi du commentaire", error);
    }
  };

  const handleReport = async (id: string) => {
    try {
      await withAuth(() => CommentsService.commentControllerReportComment(id));
      setComments(
        comments.map((c) => (c.id === id ? { ...c, reported: true } : c))
      );
    } catch (error) {
      console.error("Erreur lors du signalement", error);
    }
  };

  const handleDelete = async (id: string, isOwnComment: boolean) => {
    try {
      if (isOwnComment) {
        await withAuth(() =>
          CommentsService.commentControllerDeleteOwnComment(id)
        );
      } else {
        await withAuth(() =>
          CommentsService.commentControllerDeleteComment(id)
        );
      }
      setComments((prev) => prev.filter((c) => c.id !== id));
      toast.success("Commentaire supprimé.");
    } catch (error) {
      toast.error("Erreur lors de la suppression");
      console.error("Erreur lors de la suppression", error);
    }
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
              <span>{comment.user?.name || "Anonyme"}</span>
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
            <p className="text-sm text-muted-foreground">{comment.content}</p>

            <div className="flex gap-2 flex-wrap">
              {comment.user?.id !== user?.userId && !comment.reported && (
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={() => handleReport(comment.id)}
                >
                  <AlertCircle className="w-4 h-4 mr-1" /> Signaler
                </Button>
              )}

              {(comment.user?.id === user?.userId ||
                user?.role === "SUPERADMIN") && (
                <Button
                  size="sm"
                  variant="destructive"
                  className="text-xs"
                  onClick={() =>
                    handleDelete(comment.id, comment.user?.id === user?.userId)
                  }
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Supprimer
                </Button>
              )}

              {comment.reported && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={14} /> Signalé
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Formulaire d’ajout */}
      {user?.role !== "SUPERADMIN" && (
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
          <Button
            onClick={handleSubmit}
            disabled={!text.trim() && rating === 0}
          >
            Envoyer
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventCommentSection;
