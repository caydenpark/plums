"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function Content() {
  const searchParams = useSearchParams();
  const topicName = searchParams.get("topicName");
  const topic_id = parseInt(searchParams.get("topic_id") ?? "0");
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!title || !url || !content) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(`/api/topics/${topic_id}/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, url, description: content }),
      });

      if (!response.ok) {
        setError("Failed to add link");
        return;
      }

      const newlink = await response.json();

      // Redirect to the /Topics page
      router.push(`/Topics`);

    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
    event.target.style.textAlign = "left";
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pb-10">
      <h1 className="text-center bg-violet-300 py-14 rounded-b-3xl text-4xl w-full">
        New Link
      </h1>

      <h1 className="text-center bg-violet-300 p-6 rounded-3xl text-4xl my-32 shadow-lg border-4 border-violet-500">
        <span className="text-5xl font-bold text-violet-800">{topicName}</span>
      </h1>

      <div className="flex flex-col items-center justify-center w-full">
        <input 
          type="text" 
          placeholder="Title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-center text-3xl py-2 bg-transparent border-b-8 border-violet-400 focus:outline-none placeholder-gray-500 placeholder-opacity-65 rounded-md" 
        />
        <input 
          type="text" 
          placeholder="URL" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-4/5 md:w-1/2 lg:w-1/2 xl:w-1/3 text-center text-3xl mt-10 py-2 bg-transparent border-b-8 border-violet-400 focus:outline-none placeholder-gray-500 placeholder-opacity-65 rounded-md" 
        />
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Description"
          className="w-4/5 md:w-3/4 lg:w-1/2 xl:w-1/3 text-center text-3xl mt-10 mb-32 py-2 bg-transparent border-b-8 border-violet-400 focus:outline-none placeholder-gray-500 placeholder-opacity-65 rounded-md resize-none overflow-hidden"
          rows={1}
          style={{ lineHeight: '1.5' }}
        />
      </div>

      {error && <p className="text-red-600 font-medium mt-4">{error}</p>}

      <div className="w-full flex justify-end pr-6">
        <button
          id="nextButton"
          className="text-8xl bg-[#D9D8DD] opacity-60 p-3 rounded-l-full shadow-2xl"
          onClick={handleSubmit}
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
