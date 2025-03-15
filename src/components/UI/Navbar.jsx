import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">AI Study Planner</h1>
      <div>
        <Link to="/" className="mx-2">
          Home
        </Link>
        <Link to="/dashboard" className="mx-2">
          Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
