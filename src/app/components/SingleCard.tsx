interface CardProps {
  id: number;
  name: string;
}

export default function SingleCard({ name }: CardProps) {
  return (
    <>
      <div className="transform transition duration-100 ease-in-out hover:-translate-y-1 hover:scale-110">
        <div className="m-4 max-w-sm overflow-hidden rounded-xl shadow-md hover:shadow-2xl">
          <div className="flex flex-col items-center space-y-6 bg-rose-200 bg-opacity-75 p-6">          
            <h2 className="text-center text-2xl font-bold text-black">
              {name}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
