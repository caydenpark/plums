"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Content() {
  const searchParams = useSearchParams();
  const topicName = searchParams.get("topicName");
  const topic_id = parseInt(searchParams.get("topic_id") ?? "0");
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (isNaN(topic_id) || topic_id <= 0) {
      alert("Invalid topic ID");
    }
  }, [topic_id]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
    event.target.style.textAlign = "left";
  };

  const handleButtonClick = async () => {
    if (!title || !content) {
      alert("Please enter a title and content for the note");
      return;
    }

    if (isNaN(topic_id) || topic_id <= 0) {
      alert("Invalid topic ID");
      return;
    }

    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, topic_id }),
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      const newNote = await response.json();
      console.log("New note added:", newNote);

      // Redirect to the /Topics page
      router.push('/Topics');
    } catch (error) {
      console.error("Failed to add note", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-10">
      <h1 className="text-center bg-violet-300 py-14 rounded-b-3xl text-4xl w-full">
        New Note
      </h1>

      <h1 className="text-center bg-violet-300 p-6 rounded-3xl text-4xl my-8 shadow-lg border-4 border-violet-500">
        <span className="text-5xl font-bold text-violet-800">{topicName}</span>
      </h1>

      <div className="flex flex-col items-center w-full px-6">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Note Title"
          className="w-full p-3 border border-violet-400 bg-violet-300 rounded-xl text-3xl mb-6"
        />

        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Note Content"
          className="w-full text-center text-3xl py-5 px-4 bg-violet-300 border-8 border-violet-400 focus:outline-none placeholder-gray-500 placeholder-opacity-65 rounded-2xl shadow-2xl resize-none overflow-hidden"
          rows={1}
          style={{ lineHeight: '1.5' }}
        />
      </div>

      <div className="w-full flex justify-end pr-6">
        <button
          id="nextButton"
          className="text-8xl bg-[#D9D8DD] opacity-60 p-3 rounded-l-full shadow-2xl"
          onClick={handleButtonClick}
        >
          <Image
            src={"/right_arrow_icon.png"}
            alt="right arrow"
            width={100}
            height={100}
          />
        </button>
      </div>
    </main>
  );
}
