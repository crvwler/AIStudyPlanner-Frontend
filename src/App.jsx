import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Today from "./pages/Today";
import Upcoming from "./pages/Upcoming";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/UI/Sidebar2";

function App() {
  return (
    <Router>
      {" "}
      {/* ✅ Router wraps the whole app */}
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 sm:ml-72">
          <Routes>
            <Route path="/AIStudyPlanner-Frontend" element={<Dashboard />} />
            <Route path="/AIStudyPlanner-Frontend/today" element={<Today />} />
            <Route
              path="/AIStudyPlanner-Frontend/upcoming"
              element={<Upcoming />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
