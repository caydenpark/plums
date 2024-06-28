import TopicsBoard from "../components/TopicsBoard";
import SecondHeader from "../components/SecondHeader";
import StaticBackground from "../components/StaticBackground";

export default function Topics() {
  return (
    <>
      <div className="relative isolate px-6 pt-5 lg:px-7">
        <StaticBackground />
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <SecondHeader />
          
          <main className="m-8 flex min-h-80 items-center justify-center rounded-2xl">
            <TopicsBoard />
          </main>
        </div>
      </div>
    </>
  );
}
