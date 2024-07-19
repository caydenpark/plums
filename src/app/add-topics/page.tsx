"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function topics() {
  const [topicName, setTopicName] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTopicName(e.target.value);
  };

  const handleButtonClick = async () => {
    if (!session?.user?.id) {
      console.error("User ID is not available");
      return;
    }

    if (!topicName) {
      alert("Please enter a topic name");
      return;
    }

    try {
      const response = await fetch("/api/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: topicName, userId: session.user.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to add topic");
      }

      const newTopic = await response.json();
      const { id } = newTopic;
      console.log("New topic added:", newTopic);
      console.log("New topic id:", id);

      // Redirect to the add-content page with topicName as query parameter
      router.push(`/add-content?topicName=${encodeURIComponent(topicName)}&topic_id=${encodeURIComponent(id)}`);
    } catch (error) {
      console.error("Failed to add topic", error)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-10">
      <h1 className="text-center bg-violet-300 py-6 rounded-b-3xl text-4xl w-full">
        What is the <br/> name of your <br/> new topic?
      </h1>

      <div className="flex items-center w-3/4">
        <input
          type="text"
          placeholder="Topic Name"
          className="text-center text-3xl py-5 bg-violet-300 border-8 border-violet-400 w-full focus:outline-none placeholder-gray-500 placeholder-opacity-65 rounded-2xl shadow-2xl"
          value={topicName}
          onChange={handleInputChange}
        />
      </div>

      <div className="w-full flex justify-end ">
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