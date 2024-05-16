export default function MainHeader() {
  return (
    <header className="bg-purple-500 text-white p-5">
      <h1 className="text-4xl">PLUMS</h1>
      <nav>
        <ul className="list-none  space-y-3 p-4">
          <li className="inline-block mr-4">
            <a href="/home" className="text-white hover:text-gray-200">
              Home
            </a>
            <a href="/home" className="text-white hover:text-gray-200">
              Create
            </a>
            <a href="/home" className="text-white hover:text-gray-200">
              Update
            </a>
            <a href="/home" className="text-white hover:text-gray-200">
              Delete
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
