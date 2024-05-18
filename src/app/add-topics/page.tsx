import Image from "next/image";
import Link from "next/link";

export default function topics() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-10">
      <h1 className="text-center bg-violet-300 py-6 rounded-b-3xl text-4xl w-full">
        What is the <br/> name of your <br/> new topic?
      </h1>

      <div className="flex items-center w-3/4">
        <input type="text" placeholder="Topic Name" 
          className="text-center text-3xl py-5 bg-violet-300 border-8 border-violet-400 w-full focus:outline-none placeholder-gray-500 placeholder-opacity-65 rounded-2xl shadow-2xl" />
      </div>

      <div className="w-full flex justify-end ">
        <Link href="/add-content">
          <button id="nextButton" className="text-8xl bg-[#D9D8DD] opacity-60 p-3 rounded-l-full shadow-2xl">
            <Image
              src={"/right_arrow_icon.png"}
              alt="right arrow"
              width={100}
              height={100}
            />
          </button>
        </Link>
      </div>
      
    </main>
  );
}