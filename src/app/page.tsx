import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-5 flex min-h-screen flex-col items-center justify-between">
      <Image
        src="/Fulllogo.png"
        alt="logo"
        width={200}
        height={400}
        className="mt-5"
      />

      <h1 className="text-3xl text-center mt-5">Welcome to PLUMS</h1>
      <div className="flex flex-row space-x-32">
        <button className="p-1 mr-1">
          <Image
            src="/add_icon.png"
            alt="add image"
            width={100}
            height={100}
            className="bg-[#D9D8DD] rounded-full p-.5 m-.5 shadow-2xl"
          />
        </button>

        <Link href="/Topics">
          <button className="m-1 p-1">
            <Image
              src="/eye_icon.png"
              alt="add image"
              width={100}
              height={100}
              className="bg-[#D9D8DD] rounded-full p-.5 m-.5 shadow-2xl"
            />
          </button>
        </Link>
      </div>
    </main>
  );
}
