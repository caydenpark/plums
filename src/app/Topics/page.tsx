// src/app/Topics/page.tsx

"use client";

import React, { useState } from "react";
import SecondHeader from "../components/SecondHeader";
import TopicsList from "../components/TopicsList";
import AddTopicModal from "../components/AddTopicModal";
import MainFooter from "../components/MainFooter";
import Topic from "@/app/Data/Topic.model";
import { WavyBackground } from "../components/UI/WavyBackground";
import { Modal } from "../components/UI/Modal";
import Authenticated from "../components/Authenticated";
import CreateLabelForm from "../components/CreateLabelForm";
import LabelList from "../components/LabelList";

const Topics: React.FC = () => {
  const [isAddTopicModalOpen, setIsAddTopicModalOpen] = useState(false);
  const [isAddLabelModalOpen, setIsAddLabelModalOpen] = useState(false);
  const [topics, setTopics] = useState<{ id: number; name: string }[]>([]);
  const [selectedLabelId, setSelectedLabelId] = useState<number | null>(null);

  const openAddTopicModal = () => setIsAddTopicModalOpen(true);
  const closeAddTopicModal = () => setIsAddTopicModalOpen(false);

  const openAddLabelModal = () => setIsAddLabelModalOpen(true);
  const closeAddLabelModal = () => setIsAddLabelModalOpen(false);

  const addTopicToList = (newTopic: { id: number; name: string }) => {
    setTopics((currentTopics) => {
      const topicExists = currentTopics.some(
        (topic) => topic.id === newTopic.id
      );
      if (topicExists) {
        return currentTopics;
      } else {
        return [...currentTopics, newTopic];
      }
    });
  };

  return (
    <>
      <Authenticated>
        <div className="flex flex-col min-h-screen">
          <SecondHeader />
          <WavyBackground className="flex-1 max-w-full mx-auto px-4 sm:px-6 lg:px-8 overflow-auto">
            <div className="flex flex-col items-center justify-center py-12 sm:py-24 lg:py-32">
              <button
                onClick={openAddTopicModal}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg px-6 py-3 transition duration-150 ease-in-out mb-6 sm:mb-8 lg:mb-10"
              >
                Add Topic
              </button>
              <button
                onClick={openAddLabelModal}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg px-6 py-3 transition duration-150 ease-in-out mb-6 sm:mb-8 lg:mb-10"
              >
                Add Label
              </button>
              <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 overflow-auto">
                <LabelList onLabelClick={setSelectedLabelId} />
                <TopicsList
                  onTopicAdded={addTopicToList}
                  selectedLabelId={selectedLabelId}
                />
              </div>
              {isAddTopicModalOpen && (
                <AddTopicModal
                  onClose={closeAddTopicModal}
                  onTopicAdded={addTopicToList}
                />
              )}
              {isAddLabelModalOpen && (
                <Modal
                  isOpen={isAddLabelModalOpen}
                  closeModal={closeAddLabelModal}
                >
                  <CreateLabelForm onClose={closeAddLabelModal} />
                </Modal>
              )}
            </div>
          </WavyBackground>
          <MainFooter />
        </div>
      </Authenticated>
    </>
  );
};

export default Topics;
