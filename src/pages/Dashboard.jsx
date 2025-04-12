import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState({
    today: { classes: 0, exams: 0 },
    tasks: { dueToday: 0, dueTomorrow: 0, overdue: 0 },
    classes: { tomorrow: 0, withTasksDue: 0 },
    exams: { inNext7Days: 0 },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL + "/dashboard-stats";
    axios
      .get(apiUrl)
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch dashboard data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="sm:p-4 w-full">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Dashboard</h1>

      {loading ? (
        <p className="text-lg text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Today Card */}
          <div className="bg-blue-600 text-white p-8 rounded-xl shadow-lg w-full h-50">
            <h2 className="text-2xl font-semibold mb-3">Today</h2>
            <p className="text-lg">Classes: {stats.today.classes}</p>
            <p className="text-lg">Exams: {stats.today.exams}</p>
          </div>

          {/* Tasks Card */}
          <div className="bg-green-600 text-white p-8 rounded-xl shadow-lg w-full h-50">
            <h2 className="text-2xl font-semibold mb-3">Tasks</h2>
            <p className="text-lg">Due Today: {stats.tasks.dueToday}</p>
            <p className="text-lg">
              Due Tomorrow: {stats.tasks.dueTomorrow} &emsp; &emsp; &emsp;
              &emsp; &emsp;
            </p>
            <p className="text-lg">Overdue: {stats.tasks.overdue}</p>
          </div>

          {/* Classes Card */}
          <div className="bg-yellow-500 text-white p-8 rounded-xl shadow-lg w-full h-50">
            <h2 className="text-2xl font-semibold mb-3">Classes</h2>
            <p className="text-lg">Tomorrow: {stats.classes.tomorrow}</p>
            <p className="text-lg">
              With Tasks Due: {stats.classes.withTasksDue}
            </p>
          </div>

          {/* Exams Card */}
          <div className="bg-red-600 text-white p-8 rounded-xl shadow-lg w-full h-50">
            <h2 className="text-2xl font-semibold mb-3">Exams</h2>
            <p className="text-lg">Next 7 Days: {stats.exams.inNext7Days}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
