import React from "react";
import Link from "@/app/Data/Link.model";

interface LinkCardProps {
  link: Link;
}

export default function LinkCard({ link }: LinkCardProps) {
  return (
    <>
      <div className="relative rounded-lg border bg-white p-4 shadow-sm">
        <h2 className="mt-2 text-gray-800">{link.title}</h2>
        <a
          href={link.url}
          target="blank"
          rel="noopener noreferrer"
          className="text-blue-400"
        ></a>
      </div>
    </>
  );
}
