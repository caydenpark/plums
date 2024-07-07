// src/app/components/TopicsList.tsx
"use client";

import React, { useState, useEffect } from "react";
import SingleCard from "./SingleCard";
import Topic from "../Data/Topic.model";

interface TopicsListProps {
  onTopicAdded: (newTopic: Topic) => void;
}

const TopicsList: React.FC<TopicsListProps> = ({ onTopicAdded }) => {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await fetch("/api/topics");
      if (!response.ok) {
        throw new Error("Failed to fetch topics");
      }
      const loadedTopics = await response.json();
      setTopics(loadedTopics);
    } catch (error) {
      console.error("Failed to fetch topics", error);
    }
  };

  const handleDeleteTopic = (id: number) => {
    setTopics(topics.filter((topic) => topic.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {topics.map((topic) => (
          <div key={topic.id} className="relative">
            <SingleCard id={topic.id} name={topic.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicsList;
