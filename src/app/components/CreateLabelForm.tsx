// src/components/CreateLabelForm.tsx
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Label {
  id: number;
  name: string;
}

interface Topic {
  id: number;
  name: string;
}

const CreateLabelForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [labelName, setLabelName] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    // Fetch topics from your API
    fetch("/api/topics")
      .then((response) => response.json())
      .then((data) => setTopics(data))
      .catch((error) => console.error(error));
  }, []);

  const handleLabelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTopic) {
      alert("Please select a topic");
      return;
    }

    const response = await fetch("/api/labels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: labelName, topicId: selectedTopic }),
    });

    if (response.ok) {
      setLabelName("");
      setSelectedTopic(null);
      onClose();
    } else {
      alert("Failed to create label");
    }
  };

  return (
    <form
      onSubmit={handleLabelSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      <div>
        <label
          htmlFor="labelName"
          className="block text-sm font-medium text-gray-700"
        >
          Label Name
        </label>
        <input
          type="text"
          id="labelName"
          value={labelName}
          onChange={(e) => setLabelName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label
          htmlFor="topic"
          className="block text-sm font-medium text-gray-700"
        >
          Select Topic
        </label>
        <select
          id="topic"
          value={selectedTopic ?? ""}
          onChange={(e) => setSelectedTopic(Number(e.target.value))}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="" disabled>
            Select a topic
          </option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Label
      </button>
    </form>
  );
};

export default CreateLabelForm;
