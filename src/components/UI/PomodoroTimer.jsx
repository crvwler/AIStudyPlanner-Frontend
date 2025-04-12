import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PomodoroTimer() {
  const [seconds, setSeconds] = useState(1500); // Initial 25 minutes
  const [running, setRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [userId, setUserId] = useState("USER_ID");

  // Load saved data from localStorage on mount
  useEffect(() => {
    const storedSessions = localStorage.getItem("completedSessions");
    const storedTime = localStorage.getItem("totalTime");
    const storedRunning = localStorage.getItem("running");

    if (storedSessions) {
      setCompletedSessions(parseInt(storedSessions));
    }
    if (storedTime) {
      setSeconds(parseInt(storedTime));
    }
    if (storedRunning) {
      setRunning(storedRunning === "true");
    }
  }, []);

  // Save the data to localStorage whenever there's an update
  useEffect(() => {
    localStorage.setItem("completedSessions", completedSessions);
    localStorage.setItem("totalTime", seconds);
    localStorage.setItem("running", running);
  }, [completedSessions, seconds, running]);

  useEffect(() => {
    let timer;
    if (running && seconds > 0) {
      timer = setInterval(() => setSeconds((s) => s - 1), 1000);
    } else if (seconds === 0) {
      // Timer finished, update completed sessions and reset timer
      setCompletedSessions((prev) => prev + 1);
      setSeconds(1500); // Reset to 25 minutes

      // Send data to the backend
      sendPomodoroData(userId, completedSessions + 1, 1500);
    }

    return () => clearInterval(timer);
  }, [running, seconds]);

  const sendPomodoroData = async (userId, completedSessions, totalTime) => {
    try {
      await axios.post("http://localhost:5000/api/pomodoro/update", {
        userId,
        completedSessions,
        totalTime,
      });
      console.log("Pomodoro data updated successfully");
    } catch (err) {
      console.error("Error updating Pomodoro data:", err);
    }
  };

  const formatTime = () =>
    `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Pomodoro Focus Timer</h1>
      <div className="text-5xl font-mono mb-4">{formatTime()}</div>
      <button
        onClick={() => setRunning(!running)}
        className="bg-green-600 text-white px-6 py-2 rounded">
        {running ? "Pause" : "Start"}
      </button>
      <div className="mt-4">
        <p className="text-xl">
          Completed Sessions:{" "}
          <span className="font-bold">{completedSessions}</span>
        </p>
      </div>
    </div>
  );
}
