import React from "react";
import { Blurhash } from "react-blurhash";

const AppBackground: React.FC<{ blurhash: string }> = ({ blurhash }) => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <Blurhash
        hash={blurhash}
        width="100%"
        height="100%"
        resolutionX={32}
        resolutionY={32}
        punch={1}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
};

export default AppBackground;
