import { useState, useEffect } from "react";
import { getTasks, createTask } from "../api";
import AddTask from "../components/UI/AddTasks";
import { FaPlusCircle } from "react-icons/fa";

const Upcoming = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  // Fetch tasks and filter upcoming tasks
  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getTasks();

      // Set today's date to midnight for accurate comparison
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const upcomingTasks = fetchedTasks.filter((task) => {
        const taskDate = new Date(task.dueDate);
        return taskDate.getTime() > today.getTime(); // Compare time in milliseconds
      });

      setTasks(upcomingTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle adding a new task
  const addTask = async (newTask) => {
    try {
      await createTask(newTask);
      fetchTasks();
      setIsAddTaskOpen(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Filter tasks based on selection
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="sm:p-2 w-full">
      <h2 className="text-3xl font-semibold mb-4">📆 Upcoming Tasks</h2>

      {/* Filter & Add Task Button */}
      <div className="flex justify-between mb-4">
        <select
          className="p-2 rounded bg-black text-white focus:outline-none"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Show All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        <button
          className="flex items-center px-4 py-2 border-0 bg-gray-900 text-white rounded hover:bg-gray-950"
          onClick={() => setIsAddTaskOpen(true)}
        >
          <FaPlusCircle className="mr-2" /> Add Task
        </button>
      </div>

      {/* Add Task Modal (Overlay) */}
      {isAddTaskOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#242424] p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Add New Task
            </h3>
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
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500">No upcoming tasks yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTasks.map((task, index) => (
              <div
                key={index}
                className="p-4 rounded-lg shadow-md bg-white border border-gray-300"
              >
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
                  }`}
                >
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

export default Upcoming;
