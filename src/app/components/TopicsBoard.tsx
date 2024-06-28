"use client";

import { useState } from "react";
import AddTopic from "../components/AddTopic";
import AllTopics from "../components/AllTopics";

export default function TopicsBoard() {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <div className="m-5 grid cursor-pointer grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <button
        className="rounded-md bg-blue-600 px-4 py-2 text-white"
        onClick={handleClick}
      >
        Add Topic
      </button>
      <div>
        <AllTopics />
        {showForm && <AddTopic onClose={handleClose} />}
      </div>
    </div>
  );
}
