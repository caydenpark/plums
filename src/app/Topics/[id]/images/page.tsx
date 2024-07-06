// ImagePage.tsx
'use client';
import React, { useState, useEffect } from "react";
import Image from "../../../Data/Image.model";
import { useParams } from "next/navigation";
import ImageCard from "@/app/components/ImageCard";
import MainHeader from "@/app/components/MainHeader";
import MainFooter from "@/app/components/MainFooter";
import AddImageModal from "@/app/components/AddImageModal";
import { parse } from "path";

export default function ImagePage() {
  const [images, setImages] = useState<Image[]>([]);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true); // Set loading state
      try {
        const response = await fetch(`/api/topics/${id}/images`);
        if (!response.ok) {
          throw new Error("Failed to fetch images due to response");
        }
        const imagesData = await response.json();
        setImages(imagesData);
      } catch (error) {
        console.error("Failed to fetch images", error);
      } finally {
        setLoading(false); // Clear loading state
      }
    };
    fetchImages();
  }, [id]);

  const handleAddImage = (newImage: Image) => {
    setImages((prevImages) => [...prevImages, newImage]);
  };

  return (
    <>
      <MainHeader />
      <div className="mx-2 max-w-4xl md:p-16 lg:py-24">
        <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-4xl">Images</h1>
        <button
          className="mt-8 inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => setShowModal(true)}
        >
          Add Image
        </button>
        {showModal && (
          <AddImageModal
            topic_id={parseInt(id as string)}
            onClose={() => setShowModal(false)}
            onAddImage={handleAddImage}
          />
        )}
        {loading ? (
          <p className="text-blue-900 text-3xl">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <ImageCard key={image.id} image={image} />
            ))}
          </div>
        )}
      </div>
      <MainFooter />
    </>
  );
}
