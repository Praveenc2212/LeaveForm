import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentDashBoard from "./components/DashBoard/Student/StudentDashBoard";
import History from "./components/DashBoard/Student/History"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentDashBoard />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
