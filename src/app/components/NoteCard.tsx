//function for obtaining all notes from a topic

"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Note from "@/app/Data/Note.model";
import DeleteButton from "./DeleteButton";

interface NoteCardProps {
  note: Note;
  onDelete: (id: number) => void;
}

export default function NoteCard({ note, onDelete }: NoteCardProps) {
  const { id } = useParams();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`/api/topics/${id}/notes`);
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [id]);

  const handleDelete = (id: number) => {
    onDelete(id);
  };

  return (
    <div className="m-2 flex w-full lg:w-60 items-center justify-center rounded-md bg-orange-300 p-5 antialiased shadow-md transition-all duration-200 ease-in-out hover:rotate-1 hover:scale-105 hover:bg-orange-400 sm:m-4 md:m-6 lg:m-10 xl:m-12 xl:w-80">
      <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-white p-3 shadow-sm">
        <h2 className="text-xl font-semibold m-2">{note.title}</h2>
        <p className="text-center font-medium text-gray-800">{note.content}</p>
        <DeleteButton id={note.id} onDelete={handleDelete} entity={"notes"} />
      </div>
    </div>
  );
}
