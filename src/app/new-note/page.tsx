import Image from "next/image";
import Link from "next/link";

export default function Content() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start pb-10">
      <h1 className="text-center bg-violet-300 py-14 rounded-b-3xl text-4xl w-full">
        New Note
      </h1>

      <div className="flex flex-grow items-center justify-center">
        <input type="text" placeholder="Lorem ipsum dolor..." 
          className="text-center text-3xl py-5 bg-violet-300 border-8 border-violet-400 focus:outline-none placeholder-gray-500 placeholder-opacity-65 rounded-2xl shadow-2xl" />
      </div>
    </main>
  );
}
