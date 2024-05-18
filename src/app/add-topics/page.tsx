export default function topics() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-center bg-violet-500 py-6 rounded-b-3xl text-4xl text-white w-full">
        What is the <br/> name of your <br/> new topic?
      </h1>
      <input type="text" placeholder="Topic Name" 
        className="text-center mt-32 mb-40 pt-5 bg-transparent border-b-2 border-violet-500 w-1/3 text-white focus:outline-none placeholder-gray-500 placeholder-opacity-65 shadow-2xl" />
      <div className="w-full flex justify-end justify">
        <button id="nextButton" className="text-6xl bg-slate-200 opacity-60 w-1/3 py-3 rounded-l-full">
          &rarr;
        </button>
      </div>
    </main>
  );
}