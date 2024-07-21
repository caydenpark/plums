"use client";

import React, { useState, useEffect } from "react";
import Note from "@/app/Data/Note.model";

interface UpdateNoteModalProps {
  onClose: () => void;
  onNoteUpdated: (updatedNote: Note) => void;
  note: Note;
}

export default function UpdateNoteModal({
  onClose,
  onNoteUpdated,
  note,
}: UpdateNoteModalProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note]);

  const handleUpdateNote = async () => {
    try {
    //   const response = await fetch(`/api/topics/${note.topic_id}/notes/${note.id}`, {
      const response = await fetch(`/api/notes/${note.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, topic_id: note.topic_id }),
      });
      if (!response.ok) {
        throw new Error("Failed to update note");
      }
      const updatedNote = await response.json();
      onNoteUpdated(updatedNote);
      onClose();
    } catch (error) {
      console.error("Failed to update note", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4">Update Note</h2>
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
          onClick={handleUpdateNote}
          className="bg-purple-500 text-white px-4 py-2 rounded-xl hover:bg-purple-700"
        >
          Update Note
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
