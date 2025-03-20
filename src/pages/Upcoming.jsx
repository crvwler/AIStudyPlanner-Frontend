import { useState } from "react";

const Upcoming = () => {
  const [tasks, setTasks] = useState([
    { id: 4, title: "Submit report", dueDate: "2024-03-17", completed: false },
    { id: 5, title: "Team meeting", dueDate: "2024-03-18", completed: false },
    {
      id: 6,
      title: "Client follow-up",
      dueDate: "2024-03-19",
      completed: false,
    },
  ]);

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="sm:p-2 w-full">
      <h2 className="text-3xl font-semibold mb-4">📆 Upcoming Tasks</h2>

      <ul className="p-4 rounded-lg shadow-md border border-gray-200">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between py-3 border-b last:border-none"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="w-5 h-5 accent-blue-600"
              />
              <span
                className={`text-lg ${
                  task.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {task.title}{" "}
                <span className="text-sm text-gray-500">({task.dueDate})</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Upcoming;
