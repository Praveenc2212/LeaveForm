import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/LoginSignUp/Login';
import Signup from './components/LoginSignUp/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}


export default App;
