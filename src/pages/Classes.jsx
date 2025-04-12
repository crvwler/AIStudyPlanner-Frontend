import React, { useEffect, useState } from "react";
import axios from "axios";
import AddClass from "../components/UI/AddClass";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL + "/classes";
    axios
      .get(apiUrl)
      .then((res) => {
        setClasses(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch classes:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addClass = (newClass) => {
    setClasses((prevClasses) => [...prevClasses, newClass]);
    setIsAddClassOpen(false);
  };

  return (
    <div className="sm:p-2 w-full">
      <h2 className="text-3xl font-semibold mb-4">📚 Upcoming Classes</h2>

      {/* Add Class Button */}
      <div className="flex justify-between mb-4">
        <button
          className="flex items-center px-4 py-2 border-0 bg-gray-900 text-white rounded hover:bg-gray-950"
          onClick={() => setIsAddClassOpen(true)}>
          Add Class
        </button>
      </div>

      {/* Add Class Modal (Overlay) */}
      {isAddClassOpen && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="bg-[#242424] p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Add New Class
            </h3>
            <AddClass onAdd={addClass} />
            <button
              className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-500"
              onClick={() => setIsAddClassOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Loading classes...</p>
      ) : classes.length === 0 ? (
        <p className="text-gray-500">No upcoming classes.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((cls, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800">{cls.subject}</h3>
              <p className="text-gray-600">Topic: {cls.topic}</p>
              <p className="text-sm text-gray-500">
                Date: {new Date(cls.date).toLocaleDateString()} <br />
                Time: {cls.time}
              </p>
              {cls.hasTask && (
                <span className="inline-block mt-2 px-3 py-1 text-sm bg-yellow-400 text-black rounded-full">
                  Task Due
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Classes;
