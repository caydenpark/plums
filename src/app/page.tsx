"use client";
import Image from "next/image";
import Link from "next/link";
import { WavyBackground } from "./components/UI/WavyBackground";

export default function Home() {
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <Image
              src="/Logo.png"
              alt="PLUMS Logo"
              width={210}
              height={210}
              className="m-auto"
            />

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              PLUMS
            </h1>
            <p className="mt-9 text-2xl font-bold leading-8 text-gray-700">
              Personal Learning Management System
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/add-topics"
                className="rounded-md bg-indigo-500 px-3.5 py-3 text-sm font-semibold text-white shadow-xl hover:bg-indigo-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Topic
              </Link>

              <Link
                href="/Topics"
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold leading-6 text-white shadow-xl hover:bg-indigo-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                View Topics
              </Link>
            </div>
          </div>
        </div>
      </div>
    </WavyBackground>
  );
}
