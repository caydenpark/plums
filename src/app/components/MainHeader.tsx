import Image from "next/image";

export default function MainHeader() {
  return (
    <header className="bg-violet-500 text-white p-1">
      <h1 className="text-3xl font-bold flex justify-center">Topics</h1>
      <button>
        <Image src="/arror_icon.png" alt="logo" width={40} height={40} />
      </button>
    </header>
  );
}
