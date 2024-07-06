// src/app/components/SingleCard.tsx

import React from "react";
import { useRouter } from "next/navigation";

interface SingleCardProps {
  id: number;
  name: string;
}

const SingleCard: React.FC<SingleCardProps> = ({ id, name }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/Topics/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105"
    >
      <div className="m-4 bg-violet-500 hover:bg-orange-300 p-6 w-full h-auto max-w-xs rounded-lg shadow-md overflow-hidden border border-gray-800 hover:shadow-lg transition-all duration-300 ease-in-out">
        <div className="p-8 bg-slate-100 rounded-xl">
          <h2 className="text-center text-xl font-semibold text-black leading-tight">
            {name}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
