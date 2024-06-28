"use client";
import Image from "next/image";
import AddTopic from "./AddTopic";
import Link from "next/link";
import { useState } from "react";
import AllTopics from "./AllTopics";


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
      <div>
        <AllTopics />
        {showForm && <AddTopic onClose={handleClose} />}
      </div>
    </div>
  );
}
