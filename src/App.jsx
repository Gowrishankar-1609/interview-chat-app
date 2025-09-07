// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InterviewPage from "./pages/InterviewPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/interview" element={<InterviewPage />} />
        {/* You can add a HomePage or other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
