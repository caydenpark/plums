import Image from "next/image";
import Link from "next/link";

export default function Content() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start pb-10">
      <h1 className="text-center bg-violet-300 py-14 rounded-b-3xl text-4xl w-full">
        New Link
      </h1>

      <div className="flex flex-col flex-grow items-center justify-center">
        <input type="text" placeholder="Tailwind CSS" 
          className="text-center text-3xl py-2 bg-transparent border-b-8 border-violet-400 focus:outline-none placeholder-gray-500 placeholder-opacity-65 rounded-md" />
        <input type="text" placeholder="https://tailwindcss.com/" 
          className="text-center text-3xl mt-5 py-2 bg-transparent border-b-8 border-violet-400 focus:outline-none placeholder-gray-500 placeholder-opacity-65 rounded-md" />
      </div>
    </main>
  );
}
