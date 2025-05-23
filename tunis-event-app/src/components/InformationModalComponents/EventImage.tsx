import React from "react";

interface EventImageProps {
  imageUrl: string;
  altText: string;
  name: string;
}

const EventImage: React.FC<EventImageProps> = ({ imageUrl, altText, name }) => {
  return (
    <div className="relative w-full h-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-auto object-cover rounded-lg shadow-lg border border-gray-700"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background rounded-lg" />

      {/*  titre  */}
      <h2 className="text-xl font-bold text-left mt-4">{name}</h2>
    </div>
  );
};

export default EventImage;
