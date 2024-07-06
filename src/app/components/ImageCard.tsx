import React from "react";
import Image from "../Data/Image.model";

interface ImageCardProps {
  image: Image;
}

export default function ImageCard({ image }: ImageCardProps) {
  return (
    <div>
      <h2>{image.name}</h2>
      <p>{image.type}</p>
      <p>{image.date_added.toLocaleDateString()}</p>
    </div>
  );
}
