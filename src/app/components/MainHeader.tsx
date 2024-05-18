//Main Header with topic and User log in, log out, profle
import Link from "next/link";
import Image from "next/image";

export default function MainHeader() {
  return (
    <header className="bg-[#BAC2FF] p-2 flex flex-rox space-x-24 ">
      <Link href="/">
        <Image
          src="/back_icon.png"
          alt="logo"
          width={50}
          height={50}
          className="m-1"
        />
      </Link>
      <h1 className="text-4xl m-2">Topics</h1>

      <Link href="/profile">
        <Image
          src="/user_icon.png"
          alt="logo"
          width={50}
          height={45}
          className="m-1 p-1 bg-[#f5f5f5] rounded-full"
        />
      </Link>
    </header>
  );
}
