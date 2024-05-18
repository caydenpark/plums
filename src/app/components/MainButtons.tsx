import Image from "next/image";
import Link from "next/link";

export const MainButtons = () => {
  return (
    <div className="flex flex-row justify-center space-x-12">
      <button className="bg-[#f5f5f5] hover:bg-[#BAC2FF] rounded p-2 m-2 shadow-2xl">
        <Image
          src="/add_single_icon.png"
          alt="Add_Logo_Image"
          width={50}
          height={20}
        />
      </button>
      <button className="bg-[#f5f5f5] hover:bg-[#BAC2FF] rounded p-2 m-2 shadow-2xl">
        <Image
          src="/delete_icon.png"
          alt="delete Logo Image"
          width={50}
          height={20}
        />
      </button>
      <button className="bg-[#f5f5f5] hover:bg-[#BAC2FF] rounded p-2 m-2 shadow-2xl">
        <Image
          src="/edit_icon.png"
          alt="edit Logo Image"
          width={50}
          height={10}
        />
      </button>
    </div>
  );
};
