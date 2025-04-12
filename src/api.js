import axios from "axios";

// Use Vite-specific import.meta.env
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://aistudyplanner-backend.onrender.com/api";

// Helper function for error handling
const handleError = (error) => {
  console.error("API Error:", error);
  throw error.response ? error.response.data : "An unknown error occurred";
};

// Task Endpoints
export const getTasks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createTask = async (task) => {
  try {
    const response = await axios.post(`${BASE_URL}/tasks`, task);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${BASE_URL}/tasks/${taskId}`);
  } catch (error) {
    handleError(error);
  }
};

// Class Endpoints
export const getClasses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/classes`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createClass = async (newClass) => {
  try {
    const response = await axios.post(`${BASE_URL}/classes`, newClass);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Exam Endpoints
export const getExams = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/exams`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createExam = async (exam) => {
  try {
    const response = await axios.post(`${BASE_URL}/exams`, exam);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Dashboard Stats
export const getDashboardStats = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/dashboard-stats`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
