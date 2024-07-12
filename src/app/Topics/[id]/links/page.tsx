"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import MainHeader from "@/app/components/MainHeader";
import MainFooter from "@/app/components/MainFooter";
import LinkAddModal from "@/app/components/LinkAddModal";
import { LinkPreview } from "@/app/components/UI/LinkPreview";
import Link from "@/app/Data/Link.model";

export default function LinksPage() {
  const { id } = useParams();
  const [links, setLinks] = useState<Link[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchLinks = async () => {
        try {
          const response = await fetch(`/api/topics/${id}/links`);
          if (!response.ok) {
            throw new Error("Failed to fetch links");
          }
          const data = await response.json();
          setLinks(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchLinks();
    }
  }, [id]);

  const handleLinkAdded = (newlink: Link) => {
    setLinks((prevLinks) => [newlink, ...prevLinks]);
    setShowModal(false);
  };

  return (
    <>
      <MainHeader />
      <div className="mx-2 max-w-4xl md:p-16 lg:py-24">
        <h1 className="mt-12 sm:mt-28 text-2xl font-semibold text-gray-900 lg:mt-8 xl:mt-11">
          Links
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="my-10 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add a Link
        </button>
        {showModal && (
          <LinkAddModal
            id={Array.isArray(id) ? id[0] : id}
            onClose={() => setShowModal(false)}
            onLinkAdded={handleLinkAdded}
          />
        )}

        {links.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((link) => (
              <div
                key={link.id}
                className="mx-auto rounded-lg border-4 border-blue-300 bg-white p-4 shadow-sm transition duration-300 ease-in-out hover:-rotate-2 hover:border-blue-500 hover:shadow-lg"
              >
                <h1 className="mt-2 text-gray-800 text-xl">{link.title}</h1>
                <LinkPreview
                  url={link.url}
                  className="my-2 text-blue-600 hover:text-blue-800"
                >
                  {link.url}
                </LinkPreview>
                <p className="mt-2 text-gray-800">{link.description}</p>
                <p className="mt-2 text-sm text-gray-500">
                  {new Date(link.date_added).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-800">No links available</p>
        )}
      </div>
      <MainFooter />
    </>
  );
}
