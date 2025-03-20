import { Link } from "react-router-dom";
import { FaPlusCircle, FaSearch } from "react-icons/fa";

const Sidebar = () => {
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
          to="/today"
          className="flex items-center gap-2 p-2  bg-gray-900 rounded-lg hover:bg-gray-950 transition-all duration-200"
        >
          📅 Today
        </Link>
        <Link
          to="/upcoming"
          className="flex items-center gap-2 p-2  bg-gray-900 rounded-lg hover:bg-gray-950 transition-all duration-200"
        >
          📆 Upcoming
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
