// src/app/components/TopicsList.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import SingleCard from "./SingleCard";
import Topic from "../Data/Topic.model";
import DeleteButton from "./DeleteButton";

interface TopicsListProps {
  onTopicAdded: (newTopic: Topic) => void;
  selectedLabelId: number | null;
}

const TopicsList: React.FC<TopicsListProps> = ({
  onTopicAdded,
  selectedLabelId,
}) => {
  const [topics, setTopics] = useState<Topic[]>([]);

  const fetchTopics = useCallback(async () => {
    try {
      const response = await fetch(
        selectedLabelId !== null
          ? `/api/topics?labelId=${selectedLabelId}`
          : "/api/topics"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch topics");
      }
      const loadedTopics = await response.json();
      setTopics(loadedTopics);
    } catch (error) {
      console.error("Failed to fetch topics", error);
    }
  }, [selectedLabelId]);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  const handleDeleteTopic = (id: number) => {
    setTopics(topics.filter((topic) => topic.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {topics.map((topic) => (
          <div key={topic.id} className="relative">
            <SingleCard id={topic.id} name={topic.name} />
            <DeleteButton
              id={topic.id}
              entity="topic"
              onDelete={handleDeleteTopic}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicsList;
