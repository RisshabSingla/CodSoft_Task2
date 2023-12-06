import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import Quiz from "./pages/Quiz";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </BrowserRouter>
      {/* <Quiz />
      <Dashboard /> */}
    </div>
  );
}

export default App;
