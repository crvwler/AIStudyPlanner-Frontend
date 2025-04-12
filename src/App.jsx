import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Today from "./pages/Today";
import Upcoming from "./pages/Upcoming";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/UI/Sidebar";
import Classes from "./pages/Classes";
import Exams from "./pages/Exams";
import StudyPlannerPage from "./pages/StudyPlannerPage";
import FocusMode from "./pages/FocusMode";
import RewardsPage from "./pages/RewardsPage";
import SmartPlanner from "./pages/SmartPlanner";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 sm:ml-72 h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/today" element={<Today />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/study-planner" element={<StudyPlannerPage />} />
            <Route path="/focus-mode" element={<FocusMode />} />
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/planner" element={<SmartPlanner />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
