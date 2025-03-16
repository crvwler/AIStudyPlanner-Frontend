import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/UI/Sidebar";
import Today from "./pages/Today";
import Upcoming from "./pages/Upcoming";

function App() {
    return (
        <Router>
            <Sidebar />
            <div className="ml-64 p-6">
                <Routes>
                    <Route path="/today" element={<Today />} />
                    <Route path="/upcoming" element={<Upcoming />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
