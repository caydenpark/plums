// src/app/Topics/page.tsx

"use client";

import React, { useState } from "react";
import SecondHeader from "../components/SecondHeader";
import StaticBackground from "../components/StaticBackground";
import TopicsList from "../components/TopicsList";
import AddTopicModal from "../components/AddTopicModal";
import MainFooter from "../components/MainFooter";
import Topic from "@/app/Data/Topic.model";

const Topics: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topics, setTopics] = useState<{ id: number; name: string }[]>([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addTopicToList = (newTopic: { id: number; name: string }) => {
    setTopics((currentTopics) => {
      // Check if the topic already exists based on its id
      const topicExists = currentTopics.some(
        (topic) => topic.id === newTopic.id
      );
      if (topicExists) {
        // If the topic already exists, return the current topics without adding the new one
        return currentTopics;
      } else {
        // If the topic does not exist, add it to the list and return the new list
        return [...currentTopics, newTopic];
      }
    });
  };

  return (
    <>
      <div className="relative px-4 sm:px-6 lg:px-8">
        <StaticBackground />
        <div className="relative px-4 sm:px-6 lg:px-8">
          <SecondHeader />
          <main className="flex flex-col items-center justify-center space-y-6 py-6 sm:py-40 lg:py-40">
            <button
              onClick={openModal}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg px-6 py-3 transition duration-150 ease-in-out"
            >
              Add Topic
            </button>
            <div className="w-full max-w-6xl">
              <TopicsList onTopicAdded={addTopicToList} />
            </div>
          </main>
          {isModalOpen && (
            <AddTopicModal onClose={closeModal} onTopicAdded={addTopicToList} />
          )}
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default Topics;
