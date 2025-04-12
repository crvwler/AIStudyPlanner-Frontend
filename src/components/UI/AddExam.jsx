import { useState } from "react";
import axios from "axios";

const AddExam = ({ onAdd }) => {
  const [newExam, setNewExam] = useState({
    subject: "",
    type: "",
    date: "",
    time: "",
    venue: "",
  });

  const handleChange = (e) => {
    setNewExam({ ...newExam, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newExam.subject.trim() || !newExam.type.trim()) return;

    try {
      const apiUrl = import.meta.env.VITE_API_URL + "/exams"; // Add your API endpoint for exams
      const response = await axios.post(apiUrl, newExam);
      onAdd(response.data); // Call onAdd with the saved exam data
      setNewExam({ subject: "", type: "", date: "", time: "", venue: "" });
    } catch (error) {
      console.error("Failed to add exam:", error);
    }
  };

  return (
    <div className="rounded-lg w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Exam Subject */}
        <input
          type="text"
          name="subject"
          value={newExam.subject}
          onChange={handleChange}
          placeholder="Exam Subject"
          className="w-full p-2 border rounded-md bg-[#242424] text-white focus:ring focus:ring-green-400"
          required
        />

        {/* Exam Type */}
        <input
          type="text"
          name="type"
          value={newExam.type}
          onChange={handleChange}
          placeholder="Exam Type (e.g., Midterm)"
          className="w-full p-2 border rounded-md bg-[#242424] text-white focus:ring focus:ring-green-400"
          required
        />

        {/* Exam Date */}
        <input
          type="date"
          name="date"
          value={newExam.date}
          onChange={handleChange}
          className="w-full p-2 border rounded-md bg-[#242424] text-white focus:ring focus:ring-green-400"
        />

        {/* Exam Time */}
        <input
          type="time"
          name="time"
          value={newExam.time}
          onChange={handleChange}
          className="w-full p-2 border rounded-md bg-[#242424] text-white focus:ring focus:ring-green-400"
        />

        {/* Exam Venue */}
        <input
          type="text"
          name="venue"
          value={newExam.venue}
          onChange={handleChange}
          placeholder="Venue"
          className="w-full p-2 border rounded-md bg-[#242424] text-white focus:ring focus:ring-green-400"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold p-2 rounded-md transition-all">
          Add Exam
        </button>
      </form>
    </div>
  );
};

export default AddExam;
