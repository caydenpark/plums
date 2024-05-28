import MainHeader from "../components/MainHeader";
import SingleTopicCard from "../components/SingleTopicCard";

export default function Topics() {
  return (
    <>
      <MainHeader />
      <main className="p-2 flex min-h-screen flex-col items-center justify-between">
        <div className="w-full flex items-center justify-center">
          <div className="w-[75vh] h-[90vh] bg-white flex flex-col justify-between">
            <div className="flex flex-col items-center">
              <SingleTopicCard />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
