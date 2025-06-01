import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, AlertCircle, Trash2 } from "lucide-react";
import { CommentsService } from "@/api-sdk-backend";
import { withAuth } from "@/hooks/withAuth";
import { toast } from "sonner";

interface Comment {
  id: string;
  event: { id: string; title: string };
  user: { id: string; name: string };
  content: string;
  rating: number;
  reported: boolean;
}

const AdminCommentModeration = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    try {
      const data = await withAuth(() =>
        CommentsService.commentControllerGetReportedComments()
      );
      setComments(data);
    } catch (error) {
      console.error("Erreur lors du chargement des commentaires", error);
      toast.error("Impossible de charger les commentaires");
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await withAuth(() => CommentsService.commentControllerDeleteComment(id));
      setComments((prev) => prev.filter((c) => c.id !== id));
      toast.success("Commentaire supprimé");
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
      toast.error("Échec de la suppression");
    }
  };

  const handleToggleReport = async (id: string, reported: boolean) => {
    try {
      if (reported) {
        await withAuth(() =>
          CommentsService.commentControllerUnreportComment(id)
        );
      } else {
        await withAuth(() =>
          CommentsService.commentControllerReportComment(id)
        );
      }
      setComments((prev) =>
        prev.map((c) => (c.id === id ? { ...c, reported: !reported } : c))
      );
    } catch (error) {
      console.error("Erreur lors du changement de signalement", error);
      toast.error("Échec du signalement");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">
        Modération des commentaires signalés
      </h1>

      <div className="space-y-3">
        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aucun commentaire à afficher.
          </p>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-medium">{comment.event.title}</h2>
                {comment.reported && (
                  <Badge variant="destructive">Signalé</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {comment.user.name}
              </p>
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
              <p className="text-sm">{comment.content}</p>
              <div className="flex gap-2 pt-2 justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handleToggleReport(comment.id, comment.reported)
                  }
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
