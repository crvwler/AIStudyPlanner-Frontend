import React, { useEffect, useState } from "react";
import axios from "axios";
import AddExam from "../components/UI/AddExam";

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddExamOpen, setIsAddExamOpen] = useState(false);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL + "/exams";
    axios
      .get(apiUrl)
      .then((res) => {
        setExams(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch exams:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addExam = (newExam) => {
    setExams((prevExams) => [...prevExams, newExam]);
    setIsAddExamOpen(false);
  };

  return (
    <div className="sm:p-2 w-full">
      <h2 className="text-3xl font-semibold mb-4">📝 Upcoming Exams</h2>

      {/* Add Exam Button */}
      <div className="flex justify-between mb-4">
        <button
          className="flex items-center px-4 py-2 border-0 bg-gray-900 text-white rounded hover:bg-gray-950"
          onClick={() => setIsAddExamOpen(true)}>
          Add Exam
        </button>
      </div>

      {/* Add Exam Modal (Overlay) */}
      {isAddExamOpen && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="bg-[#242424] p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Add New Exam
            </h3>
            <AddExam onAdd={addExam} />
            <button
              className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-500"
              onClick={() => setIsAddExamOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Loading exams...</p>
      ) : exams.length === 0 ? (
        <p className="text-gray-500">No upcoming exams scheduled.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exams.map((exam, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800">
                {exam.subject}
              </h3>
              <p className="text-gray-600">Format: {exam.type}</p>
              <p className="text-sm text-gray-500">
                Date: {new Date(exam.date).toLocaleDateString()} <br />
                Time: {exam.time}
              </p>
              <p className="text-sm text-gray-500">Location: {exam.venue}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Exams;
