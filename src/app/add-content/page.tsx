"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Your main Content component
function Content() {
  const searchParams = useSearchParams();
  const topicName = searchParams.get("topicName") || "Default Topic";
  const topic_id = Number(searchParams.get("topic_id")) || 0;
  console.log("topic_id:", topic_id);
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-10">
      <h1 className="text-center bg-violet-300 py-6 rounded-b-3xl text-4xl w-full">
        Do you have any notes, <br /> images, links, or files <br /> ready to
        upload?
      </h1>

      <h1 className="text-center bg-violet-300 p-6 rounded-3xl text-4xl my-8 shadow-lg border-4 border-violet-500">
        <span className="text-5xl font-bold text-violet-800">{topicName}</span>
      </h1>
      <div className="flex justify-center items-center">
        <table className="w-full border-separate border-spacing-3 border-none">
          <tbody className="text-center">
            <tr>
              <td className="p-4 bg-violet-300 rounded-md rounded-tl-3xl">
                <Image
                  src={"/images/image_icon.png"}
                  alt="image icon"
                  width={100}
                  height={100}
                  onClick={() => router.push(`/new-image?topicName=${encodeURIComponent(topicName)}&topic_id=${encodeURIComponent(topic_id)}`)}
                />
              </td>
              <td className="p-4 bg-violet-300 rounded-md rounded-tr-3xl">
                  <Image
                    src={"/images/notes_icon.png"}
                    alt="notes icon"
                    width={100}
                    height={100}
                    onClick={() => router.push(`/new-note?topicName=${encodeURIComponent(topicName)}&topic_id=${encodeURIComponent(topic_id)}`)}
                  />
              </td>
            </tr>
            <tr>
              <td className="p-4 bg-violet-300 rounded-md rounded-bl-3xl">
                <Image
                  src={"/images/files_icon.png"}
                  alt="files icon"
                  width={100}
                  height={100}
                  onClick={() => router.push(`/new-file?topicName=${encodeURIComponent(topicName)}&topic_id=${encodeURIComponent(topic_id)}`)}
                />
              </td>
              <td className="p-4 bg-violet-300 rounded-md rounded-br-3xl">
                <Image
                  src={"/images/link_icon.png"}
                  alt="link icon"
                  width={100}
                  height={100}
                  onClick={() => router.push(`/new-link?topicName=${encodeURIComponent(topicName)}&topic_id=${encodeURIComponent(topic_id)}`)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-full flex justify-end ">
        <Link href="/Topics">
          <button
            id="nextButton"
            className="text-4xl bg-[#D9D8DD] opacity-60 p-6 rounded-l-3xl shadow-2xl"
          >
            Not Yet
          </button>
        </Link>
      </div>
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
