import React from "react";
import Image from "../Data/Image.model";
import NextImage from "next/image";

interface ImageCardProps {
  image: Image;
}

export default function ImageCard({ image }: ImageCardProps) {
  const formattedDate = new Date(image.date_added).toLocaleDateString();

  return (
    <div className="hover:rotate-1 max-w-xs lg:max-w-md xl:max-w-xl 2xl:max-w-2xl rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="relative aspect-w-16 aspect-h-9">
        <NextImage
          className="w-full h-full object-contain rounded-t-lg"
          src={image.url}
          alt={image.name}
          width={600}
          height={400}
          layout="responsive"
        />
      </div>
      <div className="px-4 py-4 lg:px-6 lg:py-6 xl:px-8 xl:py-8">
        <div className="font-bold text-xl lg:text-2xl xl:text-3xl mb-2">
          {image.name}
        </div>
        <p className="text-gray-700 text-lg lg:text-xl">{image.type}</p>
        <p className="text-gray-600 text-base lg:text-lg">{formattedDate}</p>
      </div>
    </div>
  );
}
