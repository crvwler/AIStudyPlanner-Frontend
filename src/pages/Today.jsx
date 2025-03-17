import { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import AddTask from "../components/UI/AddTasks";
import { getTasks, createTask } from "../api"; // Import API functions

const Today = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all");
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

    // Fetch tasks from the backend on component mount
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const fetchedTasks = await getTasks();
                setTasks(fetchedTasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    // Add a task to the backend
    const addTask = async (newTask) => {
        try {
            const savedTask = await createTask(newTask); // Send task to backend
            setTasks([...tasks, savedTask]); // Update state with new task
            setIsAddTaskOpen(false); // Close overlay
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <div className="ml-64 p-6 text-white">
            <h2 className="text-3xl font-semibold mb-4">📅 Tasks for Today</h2>

            {/* Filter & Add Task Button */}
            <div className="flex justify-between mb-4">
                <select 
                    className="border p-2 rounded bg-[#242424] text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                </select>

                {/* Add Task Button */}
                <button 
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                    onClick={() => setIsAddTaskOpen(true)}
                >
                    <FaPlusCircle className="mr-2" /> Add Task
                </button>
            </div>

            {/* Add Task Modal (Overlay) */}
            {isAddTaskOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#242424] p-6 rounded-lg w-96 shadow-lg">
                        <h3 className="text-lg font-semibold mb-4 text-white">Add New Task</h3>
                        <AddTask onAdd={addTask} />
                        <button 
                            className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-500"
                            onClick={() => setIsAddTaskOpen(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Task List */}
            <div className="mt-6">
                {tasks.length === 0 ? (
                    <p className="text-gray-500">No tasks for today yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {tasks.map((task, index) => (
                            <div key={index} className="p-4 rounded-lg shadow-md bg-[#242424] text-white border border-gray-700">
                                <h3 className="text-lg font-semibold">{task.title}</h3>
                                <p className="text-gray-400">{task.description}</p>
                                <p className="text-sm text-gray-500">Due: {task.dueDate || "No Date"}</p>
                                <span className={`inline-block px-3 py-1 my-2 text-sm font-semibold rounded-full ${
                                    task.priority === "High" ? "bg-red-500 text-white" :
                                    task.priority === "Normal" ? "bg-yellow-500 text-white" :
                                    "bg-blue-500 text-white"
                                }`}>
                                    {task.priority} Priority
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Today;
