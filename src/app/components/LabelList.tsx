"use client";

import React, { useState, useEffect } from "react";
import { Label } from "@/app/Data/Label.model";
import { fetchData } from "next-auth/client/_utils";

interface LabelListProps {
  onLabelClick: (labelId: number | null) => void;
}

export default function LabelList({ onLabelClick }: LabelListProps) {
  const [labels, setLabels] = useState<Label[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<number | null>(null);

  useEffect(() => {
    fetchLabels();
  }, []);

  const fetchLabels = async () => {
    try {
      const response = await fetch("/api/labels");
      if (!response.ok) {
        throw new Error("Failed to fetch labels");
      }
      const loadedLabels = await response.json();
      setLabels(loadedLabels);
    } catch (error) {
      console.error("Failed to fetch labels", error);
    }
  };

  const handleLabelClick = (labelId: number | null) => {
    setSelectedLabel(labelId);
    onLabelClick(labelId);
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => handleLabelClick(null)}
          className={`px-4 py-2 rounded-lg border border-gray-300 ${
            selectedLabel === null ? "bg-indigo-600 text-white" : ""
          }`}
        >
          All
        </button>

        {labels.map((label) => (
          <button
            key={label.id}
            onClick={() => handleLabelClick(label.id)}
            className={`px-4 py-2 rounded-lg border border-gray-300 ${
              selectedLabel === label.id ? "bg-indigo-600 text-white" : ""
            }`}
          >
            {label.name}
          </button>
        ))}
      </div>
    </>
  );
}
