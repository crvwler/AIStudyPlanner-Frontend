import React, { useState } from "react";
import { predictStudyHours } from "../utils/studyModel";

function SmartPlanner() {
  const [input, setInput] = useState({
    difficulty: 3,
    performance: 80,
    availableTime: 6,
    priority: 2,
  });

  const [predictedHours, setPredictedHours] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePredict = async () => {
    setError(""); // Reset previous errors
    setLoading(true); // Start loading
    try {
      const hours = await predictStudyHours([
        input.difficulty,
        input.performance,
        input.availableTime,
        input.priority,
      ]);
      setPredictedHours(hours);
    } catch (err) {
      setError("There was an error calculating the study hours.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto  shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center text-indigo-600">
        AI-Powered Study Planner
      </h1>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-200">Difficulty (1-5):</label>
          <input
            type="number"
            value={input.difficulty}
            min="1"
            max="5"
            onChange={(e) =>
              setInput({
                ...input,
                difficulty: Math.min(5, Math.max(1, Number(e.target.value))),
              })
            }
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-200">Past Performance (%):</label>
          <input
            type="number"
            value={input.performance}
            min="0"
            max="100"
            onChange={(e) =>
              setInput({
                ...input,
                performance: Math.min(100, Math.max(0, Number(e.target.value))),
              })
            }
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-200">Available Time (hrs):</label>
          <input
            type="number"
            value={input.availableTime}
            min="1"
            onChange={(e) =>
              setInput({
                ...input,
                availableTime: Math.max(1, Number(e.target.value)),
              })
            }
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-200">Priority (1-5):</label>
          <input
            type="number"
            value={input.priority}
            min="1"
            max="5"
            onChange={(e) =>
              setInput({
                ...input,
                priority: Math.min(5, Math.max(1, Number(e.target.value))),
              })
            }
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="text-center">
          <button
            onClick={handlePredict}
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
            disabled={loading}>
            {loading ? "Calculating..." : "Get Recommended Study Hours"}
          </button>
        </div>

        {error && (
          <div className="mt-4 text-red-600 text-center">
            <p>{error}</p>
          </div>
        )}

        {predictedHours && !loading && (
          <div className="mt-4 text-lg font-semibold text-green-700 text-center">
            📘 You should study for {predictedHours} hours!
          </div>
        )}
      </div>
    </div>
  );
}

export default SmartPlanner;
