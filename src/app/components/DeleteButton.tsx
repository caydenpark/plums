import React from "react";

interface DeleteButtonProps {
  id: number;
  entity: "notes" | "link" | "image" | "topic" | "file";
  onDelete: (id: number) => void;
}

export default function DeleteButton({
  id,
  entity,
  onDelete,
}: DeleteButtonProps) {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/${entity}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      onDelete(id);
    } catch (error) {
      console.error(`Error deleting ${entity}:`, error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="absolute -top-4 -right-8 mt-2 mr-2 rounded-xl bg-red-500 px-3 py-1 text-sm text-white transition-colors duration-200 ease-in-out hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
    >
      X
    </button>
  );
}
