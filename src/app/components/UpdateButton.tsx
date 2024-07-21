import React from "react";

interface UpdateButtonProps {
    id: number;
    entity: "notes" | "link" | "image" | "topic" | "file";
    onUpdate: (id: number) => void;
  }
  
  export default function UpdateButton({
    id,
    entity,
    onUpdate,
  }: UpdateButtonProps) {
    const handleUpdate = () => {
      onUpdate(id);
    };
  
    return (
      <button
        onClick={handleUpdate}
        className="top-22 -right-1 lg:-top-4 lg:-right-4 xl:-top-4 xl:-right-8 mt-2 mr-2 rounded-xl bg-blue-500 px-3 py-1 text-sm text-white transition-colors duration-200 ease-in-out hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
      >
        Edit
      </button>
    );
  }