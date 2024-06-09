import Image from "next/image";
import Link from "next/link";

export default function Content() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-10">
      <h1 className="text-center bg-violet-300 py-6 rounded-b-3xl text-4xl w-full">
        Do you have any notes, <br/> images, links, or files <br/> ready to upload?
      </h1>

      <div className="flex justify-center items-center">
        <table className="w-full border-separate border-spacing-3 border-none">
          <tbody className="text-center">
            <tr>
              <td className="p-4 bg-violet-300 rounded-md rounded-tl-3xl">
                <Link href="/new-image">
                    <Image
                      src={"/images/image_icon.png"}
                      alt="image icon"
                      width={100}
                      height={100}
                    />
                </Link>
              </td>
              <td className="p-4 bg-violet-300 rounded-md rounded-tr-3xl">
                <Link href="/new-note">
                    <Image
                      src={"/images/notes_icon.png"}
                      alt="notes icon"
                      width={100}
                      height={100}
                    />
                </Link>
              </td>
            </tr>
            <tr>
              <td className="p-4 bg-violet-300 rounded-md rounded-bl-3xl">
                <Link href="/new-file">
                    <Image
                      src={"/images/files_icon.png"}
                      alt="files icon"
                      width={100}
                      height={100}
                    />
                </Link>
              </td>
              <td className="p-4 bg-violet-300 rounded-md rounded-br-3xl">
                <Link href="">
                    <Image
                      src={"/images/link_icon.png"}
                      alt="link icon"
                      width={100}
                      height={100}
                    />
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-full flex justify-end ">
        <Link href="/Topics">
          <button id="nextButton" className="text-4xl bg-[#D9D8DD] opacity-60 p-6 rounded-l-3xl shadow-2xl">
            Not Yet
          </button>
        </Link>
      </div>
    </main>
  );
}
