"use client";

import React, { useState } from "react";
import FileUpload from "./FileUpload";

interface FileUploadModalProps {
  topic_id: number;
  name: string;
  onUploadSuccess: (newFile: any) => void;
  onClose: () => void;
}

export default function FileUploadModal({
  topic_id,
  name,
  onUploadSuccess,
  onClose,
}: FileUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setFileName(selectedFile?.name || ""); // Set initial file name
  };

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

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
      onClose();
    } catch (error) {
      console.error("Failed to upload file", error);
      setError("Failed to upload file");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Upload File</h2>
        <input type="file" onChange={handleFileChange} className="mb-4" />

        {file && (
          <p className="text-sm text-gray-500 mb-4">
            Selected file: {file.name}
          </p>
        )}
        <input
          type="text"
          value={fileName}
          onChange={handleFileNameChange}
          placeholder="Enter file name"
          className="border border-gray-300 rounded-md px-3 py-2 mb-4"
        />
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
