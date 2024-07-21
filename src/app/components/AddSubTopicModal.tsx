import React, { useState } from "react";
import { Modal } from "./UI/Modal";

interface AddSubTopicModalProps {
  topicId: number;
  onClose: () => void;
  onAddSubtopic: (newSubtopic: { name: string }) => void;
}

export default function AddSubTopicModal({
  topicId,
  onClose,
  onAddSubtopic,
}: AddSubTopicModalProps) {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault();
    try {
      const response = await fetch(`/api/topics/${topicId}/subtopics`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const newSubtopic = await response.json();
      onAddSubtopic(newSubtopic);
      onClose();
    } catch (error) {
      console.error(
        "There was an error creating the subtopic",
        error instanceof Error ? error.message : error
      );
    }
  };

  return (
    <>
      <Modal isOpen={true} closeModal={onClose}>
        <h2 className="text-lg font-semibold">Add Subtopic</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <label className="block">
            Subtopic Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md px-2 py-1"
            />
          </label>
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700"
            >
              Add Subtopic
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md shadow-sm hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
