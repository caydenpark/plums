"use client";

import React, { useState } from "react";

interface FileUploadProps {
  topic_id: number;
  onUploadSuccess: (newFile: any) => void;
}

export default function FileUpload({
  topic_id,
  onUploadSuccess,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setError("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("topicId", topic_id.toString());

    try {
      const response = await fetch(`/api/topics/${topic_id}/files`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const newFile = await response.json();
      onUploadSuccess(newFile);
      setFile(null);
      setError(null);
    } catch (err) {
      setError("Failed to upload file");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Upload
      </button>
    </form>
  );
}
