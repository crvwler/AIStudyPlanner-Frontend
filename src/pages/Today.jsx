import { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import AddTask from "../components/UI/AddTasks";
import { getTasks, createTask } from "../api";

const Today = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  // Get today's date in "YYYY-MM-DD" format
  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  // Fetch tasks and filter today's tasks
  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getTasks();
      const todayTasks = fetchedTasks.filter((task) => {
        const taskDate = new Date(task.dueDate).toISOString().split("T")[0]; // Normalize to YYYY-MM-DD
        return taskDate === getTodayDate();
      });
      setTasks(todayTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Call fetchTasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (newTask) => {
    try {
      const savedTask = await createTask(newTask);
      setTasks((prevTasks) =>
        [...prevTasks, savedTask].filter(
          (task) =>
            new Date(task.dueDate).toISOString().split("T")[0] ===
            getTodayDate()
        )
      );
      setIsAddTaskOpen(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="sm:p-2 w-full">
      <h2 className="text-3xl font-semibold mb-4">📅 Tasks for Today</h2>

      {/* Filter & Add Task Button */}
      <div className="flex justify-between mb-4">
        <select
          className=" p-2 rounded bg-black text-white focus:outline-none"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Show All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        <button
          className="flex items-center px-4 py-2 border-0 bg-gray-900 text-white rounded hover:bg-gray-950"
          onClick={() => setIsAddTaskOpen(true)}>
          <FaPlusCircle className="mr-2" /> Add Task
        </button>
      </div>

      {/* Add Task Modal (Overlay) */}
      {isAddTaskOpen && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="bg-[#242424] p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Add New Task
            </h3>
            <AddTask onAdd={addTask} />
            <button
              className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-500"
              onClick={() => setIsAddTaskOpen(false)}>
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
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="p-4 rounded-lg shadow-md bg-white border border-gray-300">
                <h3 className="text-gray-600 font-bold text-lg">
                  {task.title}
                </h3>
                <p className="text-gray-600">{task.description}</p>
                <p className="text-sm text-gray-500">
                  Due:{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "No Date"}
                </p>
                <span
                  className={`inline-block px-3 py-1 my-2 text-sm font-semibold rounded-full ${
                    task.priority === "High"
                      ? "bg-red-500 text-white"
                      : task.priority === "Normal"
                      ? "bg-yellow-500 text-white"
                      : "bg-blue-500 text-white"
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
