"use client";

import { useState, useEffect } from "react";
import SingleCard from "./SingleCard";

interface TopicProps {
  id: number;
  name: string;
  description: string;
  date_added: Date;
}

async function fetchTopics() {
  const response = await fetch("/api/topics");
  if (!response.ok) {
    throw new Error("Failed to fetch topics");
  }
  return response.json();
}

export default function AllTopics() {
  const [topics, setTopics] = useState<TopicProps[]>([]);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const topics = await fetchTopics();
        setTopics(topics);
      } catch (error) {
        console.error("Failed to fetch topics", error);
      }
    };
    loadTopics();
  }, []);

  return (
    <div>
      {topics.map((topic) => (
        <SingleCard key={topic.id} {...topic} />
      ))}
    </div>
  );
}
