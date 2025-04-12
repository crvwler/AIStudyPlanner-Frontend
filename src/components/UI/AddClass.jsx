import { useState } from "react";
import axios from "axios";

const AddClass = ({ onAdd }) => {
  const [newClass, setNewClass] = useState({
    subject: "",
    topic: "",
    date: "",
    time: "",
    hasTask: false,
  });

  const handleChange = (e) => {
    setNewClass({ ...newClass, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newClass.subject.trim() || !newClass.topic.trim()) return;

    try {
      const apiUrl = import.meta.env.VITE_API_URL + "/classes"; // Add your API endpoint for classes
      const response = await axios.post(apiUrl, newClass);
      onAdd(response.data); // Call onAdd with the saved class data
      setNewClass({
        subject: "",
        topic: "",
        date: "",
        time: "",
        hasTask: false,
      });
    } catch (error) {
      console.error("Failed to add class:", error);
    }
  };

  return (
    <div className="rounded-lg w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Class Subject */}
        <input
          type="text"
          name="subject"
          value={newClass.subject}
          onChange={handleChange}
          placeholder="Class Subject"
          className="w-full p-2 border rounded-md bg-[#242424] text-white focus:ring focus:ring-green-400"
          required
        />

        {/* Class Topic */}
        <input
          type="text"
          name="topic"
          value={newClass.topic}
          onChange={handleChange}
          placeholder="Class Topic"
          className="w-full p-2 border rounded-md bg-[#242424] text-white focus:ring focus:ring-green-400"
          required
        />

        {/* Class Date */}
        <input
          type="date"
          name="date"
          value={newClass.date}
          onChange={handleChange}
          className="w-full p-2 border rounded-md bg-[#242424] text-white focus:ring focus:ring-green-400"
        />

        {/* Class Time */}
        <input
          type="time"
          name="time"
          value={newClass.time}
          onChange={handleChange}
          className="w-full p-2 border rounded-md bg-[#242424] text-white focus:ring focus:ring-green-400"
        />

        {/* Has Task Due */}
        <label className="inline-flex items-center text-white">
          <input
            type="checkbox"
            name="hasTask"
            checked={newClass.hasTask}
            onChange={(e) =>
              setNewClass({ ...newClass, hasTask: e.target.checked })
            }
            className="form-checkbox"
          />
          <span className="ml-2">Task Due</span>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold p-2 rounded-md transition-all">
          Add Class
        </button>
      </form>
    </div>
  );
};

export default AddClass;
