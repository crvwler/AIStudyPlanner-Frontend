import { Link } from "react-router-dom";
import { useState } from "react";
import { FaPlusCircle, FaSearch } from "react-icons/fa";

const Sidebar = () => {
  const [setIsOpen] = useState(false);

  return (
    <div className="w-64 h-screen bg-cyan-950 text-white fixed top-0 left-0 p-5 flex flex-col">
      {/* Header */}
      <Link to="/">
        <h2 className="text-2xl font-bold py-4 mb-4 text-center">
          📝 AI-Powered Study Planner
        </h2>
      </Link>

      {/* Search Input */}
      <div className="relative mb-6">
        <FaSearch className="absolute left-3 top-3 text-gray-500" />
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 pl-10 text-white rounded-lg focus:outline-none "
        />
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col space-y-2">
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2 p-2 bg-gray-900 rounded-lg hover:bg-gray-950 transition-all duration-200">
          <svg
            className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 21">
            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
          </svg>
          <span>Dashboard</span>
        </Link>
        <Link
          to="/classes"
          className="flex items-center gap-2 p-2  bg-gray-900 rounded-lg hover:bg-gray-950 transition-all duration-200">
          📚 Classes
        </Link>
        <Link
          to="/exams"
          className="flex items-center gap-2 p-2  bg-gray-900 rounded-lg hover:bg-gray-950 transition-all duration-200">
          📝 Exams
        </Link>
        <Link
          to="/today"
          className="flex items-center gap-2 p-2  bg-gray-900 rounded-lg hover:bg-gray-950 transition-all duration-200">
          📅 Today
        </Link>
        <Link
          to="/upcoming"
          className="flex items-center gap-2 p-2  bg-gray-900 rounded-lg hover:bg-gray-950 transition-all duration-200">
          📆 Upcoming
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
