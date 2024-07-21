import React, { useState, useEffect, useCallback } from "react";
import SingleCard from "./SingleCard";
import { Topic, Subtopic } from "../Data/Topic.model";
import DeleteButton from "./DeleteButton";
import AddSubTopicModal from "./AddSubTopicModal";

interface TopicsListProps {
  onTopicAdded: (newTopic: Topic) => void;
  selectedLabelId: number | null;
}

const TopicsList: React.FC<TopicsListProps> = ({
  onTopicAdded,
  selectedLabelId,
}) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isAddSubTopicModalOpen, setIsAddSubTopicModalOpen] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);

  const openAddSubTopicModal = (topicId: number) => {
    setSelectedTopicId(topicId);
    setIsAddSubTopicModalOpen(true);
  };

  const closeAddSubTopicModal = () => {
    setIsAddSubTopicModalOpen(false);
    setSelectedTopicId(null);
  };

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

  const handleAddSubtopic = (subtopic: Subtopic) => {
    // Logic to add the subtopic to the selected topic
    // For example:
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === selectedTopicId
          ? { ...topic, subtopics: [...(topic.subtopics || []), subtopic] }
          : topic
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {topics.map((topic) => (
          <div key={topic.id} className="relative">
            <SingleCard
              key={topic.id}
              id={topic.id}
              name={topic.name}
              onDelete={handleDeleteTopic}
            />
            <button
              onClick={() => openAddSubTopicModal(topic.id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 transition duration-150 ease-in-out"
            >
              Add Subtopic
            </button>
            <DeleteButton
              id={topic.id}
              entity="topic"
              onDelete={handleDeleteTopic}
            />
          </div>
        ))}
      </div>
      {isAddSubTopicModalOpen && selectedTopicId !== null && (
        <AddSubTopicModal
          topicId={selectedTopicId}
          onClose={closeAddSubTopicModal}
          onAddSubtopic={handleAddSubtopic}
        />
      )}
    </div>
  );
};

export default TopicsList;
