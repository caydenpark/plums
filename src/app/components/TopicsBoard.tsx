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
        
        <button
          className="mt-4 rounded-full bg-blue-100 p-4 text-white shadow-lg transition-colors duration-200 hover:bg-slate-400 fixed bottom-0 right-0 m-5"
          onClick={handleClick}
        >
          <Image
            src="/add_icon.png"
            alt="Add a new topic"
            width={35}
            height={35}
          />
        </button>
        {showForm && <AddTopic onClose={handleClose} />}
      </div>
    </div>
  );
}
