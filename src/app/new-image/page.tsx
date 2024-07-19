"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import AddImageModal from "@/app/components/AddImageModal"; // Import the AddImageModal component
import { ImgType } from "@prisma/client";
import ImageModel from "../Data/Image.model";

export default function Content() {
  const searchParams = useSearchParams();
  const topicName = searchParams.get("topicName");
  const topic_id = parseInt(searchParams.get("topic_id") ?? "0");
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleAddImage = (newImage: ImageModel) => {
    setShowModal(false); // Close the modal after ad image
    router.push('/Topics');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pb-10">
      <h1 className="text-center bg-violet-300 py-14 rounded-b-3xl text-4xl w-full">
        New Image
      </h1>

      <h1 className="text-center bg-violet-300 p-6 rounded-3xl text-4xl my-32 shadow-lg border-4 border-violet-500">
        <span className="text-5xl font-bold text-violet-800">{topicName}</span>
      </h1>

      <div className="flex flex-grow items-center justify-center">
        <div
          onClick={handleImageClick} // Add click handler
          className="p-8 bg-violet-300 rounded-3xl w-[20rem] h-[20rem] flex items-center justify-center shadow-2xl cursor-pointer"
        >
          <Image
            src={"/images/new_image_icon.png"}
            alt="image icon"
            width={250}
            height={250}
          />
        </div>
      </div>

      {showModal && (
        <AddImageModal
          topic_id={topic_id}
          onClose={() => setShowModal(false)}
          onAddImage={handleAddImage}
        />
      )}
    </main>
  );
}
