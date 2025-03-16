import { Link } from "react-router-dom";
import { FaPlusCircle, FaSearch } from "react-icons/fa";

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-gray-900 text-white fixed top-0 left-0 p-5 flex flex-col">
            {/* Header */}
            <h2 className="text-2xl font-bold py-4 mb-4 text-center">📝 AI-Powered Study Planner</h2>
            {/* Add Task Button */}
            <button className="w-full flex items-center gap-2 p-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md mb-4 transition-all duration-200">
                <FaPlusCircle size={18} /> Add Task
            </button>

            {/* Search Input */}
            <div className="relative mb-6">
                <FaSearch className="absolute left-3 top-3 text-gray-500" />
                <input 
                    type="text" 
                    placeholder="Search" 
                    className="w-full p-2 pl-10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            {/* Navigation Menu */}
            <nav className="flex flex-col space-y-2">
                <Link 
                    to="/today" 
                    className="flex items-center gap-2 p-2  bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-200"
                >
                    📅 Today
                </Link>
                <Link 
                    to="/upcoming" 
                    className="flex items-center gap-2 p-2  bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-200"
                >
                    📆 Upcoming
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;
