import React from "react";

// ✅ Fonction réutilisable pour formatter la description ProseMirror/Tiptap
export const extractFormattedText = (
  description: string | null,
  fallbackText = "Aucune description disponible pour le moment."
) => {
  if (!description) {
    return <span className="text-sm text-gray-500 italic">{fallbackText}</span>;
  }

  try {
    const jsonData = JSON.parse(description);
    if (!jsonData || !jsonData.content) {
      return (
        <span className="text-sm text-gray-500 italic">{fallbackText}</span>
      );
    }

    return jsonData.content.map((block: any, index: number) => {
      if (block.type === "paragraph") {
        return (
          <p key={index} className="text-sm text-foreground leading-relaxed">
            {block.content?.map((textNode: any, i: number) => {
              let textStyle = "";

              if (textNode.marks) {
                textNode.marks.forEach((mark: any) => {
                  if (mark.type === "bold") textStyle += " font-bold";
                  if (mark.type === "italic") textStyle += " italic";
                  if (mark.type === "textStyle" && mark.attrs?.color)
                    textStyle += ` text-[${mark.attrs.color}]`;
                });
              }

              return (
                <span key={i} className={textStyle}>
                  {textNode.text}
                </span>
              );
            })}
          </p>
        );
      }
      return null;
    });
  } catch (error) {
    return <span className="text-sm text-gray-500 italic">{fallbackText}</span>;
  }
};
