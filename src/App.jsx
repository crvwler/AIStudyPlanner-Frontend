import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Today from "./pages/Today";
import Upcoming from "./pages/Upcoming";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/UI/Sidebar";
import Classes from "./pages/Classes";
import Exams from "./pages/Exams";

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
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
