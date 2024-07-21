"use client";

import React, { useState } from "react";
import { Modal } from "./UI/Modal"; // Adjust the import path as needed

interface AddSubTopicModalProps {
  topicId: number;
  onClose: () => void;
  onAddSubtopic: (subtopic: { id: number; name: string }) => void;
}

const AddSubTopicModal: React.FC<AddSubTopicModalProps> = ({
  topicId,
  onClose,
  onAddSubtopic,
}) => {
  const [subtopicName, setSubtopicName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (subtopicName.trim()) {
      setIsSubmitting(true);
      setError(null);
      try {
        const response = await fetch(`/api/topics/subtopics`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: subtopicName, topicId }),
        });

        if (!response.ok) {
          throw new Error("Failed to create subtopic");
        }

        const newSubtopic = await response.json();
        onAddSubtopic(newSubtopic);
        setSubtopicName("");
        onClose();
      } catch (err) {
        setError("An error occurred while adding the subtopic.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Modal isOpen={true} closeModal={onClose}>
      <form onSubmit={handleSubmit} className="p-6">
        <h2 className="text-xl font-semibold mb-4">Add Subtopic</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label
            htmlFor="subtopicName"
            className="block text-sm font-medium text-gray-700"
          >
            Subtopic Name
          </label>
          <input
            id="subtopicName"
            type="text"
            value={subtopicName}
            onChange={(e) => setSubtopicName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg px-4 py-2 transition duration-150 ease-in-out"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddSubTopicModal;
