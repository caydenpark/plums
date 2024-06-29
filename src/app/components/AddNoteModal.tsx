"use client";

import React, { useState } from "react";
import Note from "@/app/Data/Note.model";

interface AddNoteModalProps {
  onClose: () => void;
  onNoteAdded: (newNote: Note) => void;
  topic_id: number;
}

export default function AddNoteModal({
  onClose,
  onNoteAdded,
  topic_id,
}: AddNoteModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddNote = async () => {
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, topic_id: topic_id }),
      });
      if (!response.ok) {
        throw new Error("Failed to add note");
      }
      const newNote = await response.json();
      onNoteAdded(newNote);
      onClose();
    } catch (error) {
      console.error("Failed to add note", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4">Add Note</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note Title"
          className="w-full p-2 border border-violet-300 bg-slate-100 mb-4 rounded-xl"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Note Content"
          className="w-full p-2 border border-violet-300 bg-slate-100 rounded-xl mb-4"
        />
        <button
          onClick={handleAddNote}
          className="bg-purple-500 text-white px-4 py-2 rounded-xl hover:bg-purple-700"
        >
          Add Note
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-700 ml-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
