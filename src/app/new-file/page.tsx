import Image from "next/image";
import Link from "next/link";

export default function Content() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start pb-10">
      <h1 className="text-center bg-violet-300 py-14 rounded-b-3xl text-4xl w-full">
        New File
      </h1>

      <div className="flex flex-grow items-center justify-center">
        <div className="p-8 bg-violet-300 rounded-3xl w-[20rem] h-[20rem] flex items-center justify-center shadow-2xl">
          <Image
            src={"/images/new_file_icon.png"}
            alt="image icon"
            width={250}
            height={250}
          />
        </div>
      </div>
    </main>
  );
}
