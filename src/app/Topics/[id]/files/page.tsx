// src/app/Topics/[id]/files/page.tsx

"use client";

import { useParams } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';
import MainHeader from '@/app/components/MainHeader';
import MainFooter from '@/app/components/MainFooter';
import FileUploadModal from '@/app/components/FileUploadModal';
import { Attachment } from '@prisma/client';

export default function FilePage() {
  const params = useParams();
  const topic_id = params.id as string;

  const [files, setFiles] = useState<Attachment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchFiles = useCallback(async () => {
    try {
      const response = await fetch(`/api/topics/${topic_id}/files`);
      if (!response.ok) {
        throw new Error('Failed to fetch files');
      }
      const loadedFiles = await response.json();
      setFiles(loadedFiles);
    } catch (error) {
      console.error('Failed to fetch files', error);
    }
  }, [topic_id]);

  useEffect(() => {
    if (topic_id) {
      fetchFiles();
    }
  }, [topic_id, fetchFiles]);

  const handleUploadSuccess = (newFile: Attachment) => {
    setFiles([...files, newFile]);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!topic_id) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <MainHeader />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Files Page</h1>
        <button onClick={openModal} className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4">Upload File</button>
        {isModalOpen && (
          <FileUploadModal
            topic_id={parseInt(topic_id, 10)}
            onUploadSuccess={handleUploadSuccess}
            onClose={closeModal}
          />
        )}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Uploaded Files</h2>
          <ul>
            {files.map((file) => (
              <li key={file.id} className="mb-2">
                <a href={`/api/files/${file.id}`} download className="text-blue-500 underline">
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <MainFooter />
    </>
  );
}
