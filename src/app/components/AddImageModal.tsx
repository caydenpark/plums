'use client';
import React, { useState } from "react";
import Image from "../Data/Image.model";

interface AddImageModalProps {
  topic_id: number;
  onClose: () => void;
  onAddImage: (newImage: Image) => void;
}

export default function AddImageModal({
  topic_id,
  onClose,
  onAddImage,
}: AddImageModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/topics/${topic_id}/images`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, type }),
      });

      if (!response.ok) {
        throw new Error("Failed to add image");
      }

      const newImage = await response.json();
      onAddImage(newImage);
      onClose();
    } catch (error) {
      console.error("Error adding image:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-60">
      <div className="rounded-2xl bg-white p-8 shadow-2xl md:p-12 lg:p-16">
        <h2 className="mb-6 text-2xl font-bold text-gray-800 md:text-3xl">
          Add a New Image
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-lg font-semibold text-gray-700"
            >
              URL
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 block w-full rounded-lg border-gray-300 p-3 text-base shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="type"
              className="block text-lg font-semibold text-gray-700"
            >
              Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-2 block w-full rounded-lg border-gray-300 p-3 text-base shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="JPEG">JPEG</option>
              <option value="JPG">JPG</option>
              <option value="PNG">PNG</option>
              <option value="HEIC">HEIC</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Image
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
