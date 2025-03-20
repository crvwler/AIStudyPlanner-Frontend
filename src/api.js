import axios from "axios";

// eslint-disable-next-line no-undef
const API_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:5000/api/tasks"
  : "https://aistudyplanner-backend.onrender.com/api/tasks";

export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const deleteTask = async (taskId) => {
  await axios.delete(`${API_URL}/${taskId}`);
};
