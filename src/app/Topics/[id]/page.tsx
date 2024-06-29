// src/app/Topics/[id]/page.tsx

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MainHeader from "@/app/components/MainHeader";
import MainFooter from "@/app/components/MainFooter";
import NoteCard from "@/app/components/NoteCard";
import AddNoteModal from "@/app/components/AddNoteModal";
import Note from "@/app/Data/Note.model";

interface Topic {
  id: number;
  name: string;
  notes: Note[];
}

export default function TopicPage() {
  const { id } = useParams();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await fetch(`/api/topics/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch topic");
        }
        const loadedTopic = await response.json();
        setTopic(loadedTopic);
      } catch (error) {
        console.error("Failed to fetch topic", error);
      }
    };

    fetchTopic();
  }, [id]);

  const handleAddNote = (newNote: Note) => {
    setTopic((prevTopic) => {
      if (!prevTopic) return null;
      return {
        ...prevTopic,
        notes: [...prevTopic.notes, newNote],
      };
    });
  };

  return (
    <>
      <MainHeader />
      <div className="mx-4 my-14 max-w-4xl p-6 sm:my-14 md:my-28 lg:my-40">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            {topic ? `Notes for Topic: ${topic.name}` : "Loading topic..."}{" "}
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mb-6 bg-violet-500 text-white px-4 py-2 rounded-xl hover:bg-violet-600"
          >
            Add Note
          </button>
        </div>
        {topic && topic.notes.length > 0 ? (
          <div className="grid md:gap-4 lg:gap-x-24 xl:gap-60 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {topic.notes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        ) : (
          <p className="mt-2 text-gray-600">No notes available.</p>
        )}
      </div>

      {isModalOpen && (
        <AddNoteModal
          onClose={() => setIsModalOpen(false)}
          onNoteAdded={handleAddNote}
          topic_id={Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10)}
        />
      )}
      <MainFooter />
    </>
  );
}
