"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import FileUploadModal from "../components/FileUploadModal";
import Image from "next/image";

// Main Content component
function Content() {
  const searchParams = useSearchParams();
  const topicName = searchParams.get("topicName");
  const topic_id = parseInt(searchParams.get("topic_id") ?? "0");
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUploadSuccess = (newFile: any) => {
    console.log("File uploaded successfully:", newFile);
    setIsModalOpen(false);
    router.push("/Topics");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pb-10">
      <h1 className="text-center bg-violet-300 py-14 rounded-b-3xl text-4xl w-full">
        New File
      </h1>

      <h1 className="text-center bg-violet-300 p-6 rounded-3xl text-4xl my-32 shadow-lg border-4 border-violet-500">
        <span className="text-5xl font-bold text-violet-800">{topicName}</span>
      </h1>

      <div className="flex flex-grow items-center justify-center">
        <div
          className="p-8 bg-violet-300 rounded-3xl w-[20rem] h-[20rem] flex items-center justify-center shadow-2xl cursor-pointer"
          onClick={() => setIsModalOpen(true)} // Open modal on image click
        >
          <Image
            src={"/images/new_file_icon.png"}
            alt="image icon"
            width={250}
            height={250}
          />
        </div>
      </div>

      {isModalOpen && (
        <Suspense fallback={<div>Loading File Upload Modal...</div>}>
          <FileUploadModal
            topic_id={topic_id}
            name={topicName ?? ""}
            onUploadSuccess={handleUploadSuccess}
            onClose={() => setIsModalOpen(false)} // Close modal
          />
        </Suspense>
      )}
    </main>
  );
}

// Suspense Boundary Component
function SuspenseWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Content />
    </Suspense>
  );
}

export default SuspenseWrapper;
