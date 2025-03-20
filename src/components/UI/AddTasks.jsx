import { useState } from "react";

const AddTask = ({ onAdd }) => {
    const [task, setTask] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: "Normal"
    });

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task.title.trim()) return;
        onAdd(task);
        setTask({ title: "", description: "", dueDate: "", priority: "Normal" });
    };

    return (
        <div className="rounded-lg w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-3">
                {/* Task Title */}
                <input
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    placeholder="Task Title"
                    className="w-full p-2 border rounded-md bg-[#242424] text-white focus:ring focus:ring-green-400"
                    required
                />

                {/* Task Description */}
                <textarea
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    placeholder="Task Description"
                    rows="3"
                    className="w-full p-2 border rounded-md bg-[#242424] text-white focus:ring focus:ring-green-400"
                />

                {/* Due Date */}
                <input
                    type="date"
                    name="dueDate"
                    value={task.dueDate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md bg-[#242424] text-white focus:ring focus:ring-green-400"
                />

                {/* Priority Selection */}
                <select
                    name="priority"
                    value={task.priority}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md bg-[#242424] text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                    <option value="Low">Low Priority</option>
                    <option value="Normal">Normal Priority</option>
                    <option value="High">High Priority</option>
                </select>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold p-2 rounded-md transition-all"
                >
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default AddTask;
