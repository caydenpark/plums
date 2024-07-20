// ImagePage.tsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "../../../Data/Image.model";
import { useParams } from "next/navigation";
import ImageCard from "@/app/components/ImageCard";
import MainHeader from "@/app/components/MainHeader";
import MainFooter from "@/app/components/MainFooter";
import AddImageModal from "@/app/components/AddImageModal";
import { WavyBackground } from "@/app/components/UI/WavyBackground";

export default function ImagePage() {
  const [images, setImages] = useState<Image[]>([]);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
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
        setLoading(false);
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
      <WavyBackground
        className="relative z-10"
        containerClassName="h-screen flex flex-col items-center justify-center"
        colors={["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"]}
        waveWidth={50}
        backgroundFill="#E0C3FD"
        blur={10}
        speed="fast"
        waveOpacity={0.5}
      >
        <div className="container my-20 sm:my-12 md:my-0 lg:my-0 xl:my-0 mx-4 md:p-4 lg:py-10">
          <h1 className="mx-0 text-3xl sm:mt-24 sm:mb-8 md:text-4xl lg:text-4xl xl:text-4xl">
            Images
          </h1>
          <button
            className="mt-8 sm:mt-0 inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
            <div className="m-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {images.map((image) => (
                <div key={image.id} className="flex justify-center">
                  <ImageCard image={image} />
                </div>
              ))}
            </div>
          )}
        </div>
      </WavyBackground>
      <MainFooter />
    </>
  );
}
