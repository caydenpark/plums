// Obtain and display the topic card dynamically obtained from database
import Image from "next/image";

export default function SingleTopicCard() {
  return (
    <div className="bg-[#D9D8DD] p-3 m-5 rounded-2xl w-9/12 flex shadow-xl justify-center">
      <h1 className="text-4xl m-1">React</h1>
      <Image
        src="/right_arrow_icon.png"
        alt="arrow icon"
        width={50}
        height={50}
        className="m-1 ml-9"
      />
    </div>
  );
}
