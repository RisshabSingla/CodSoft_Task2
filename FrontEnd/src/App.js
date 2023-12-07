import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import Quiz from "./pages/Quiz";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";

function App() {
  const [loggedInID, setLoggedInID] = useState("");
  const [userXAuth, setUserXAuth] = useState("");
  const [quizData, setQuiz] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              setLoggedInID={setLoggedInID}
              setUserXAuth={setUserXAuth}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              loggedInID={loggedInID}
              userXAuth={userXAuth}
              setQuiz={setQuiz}
            />
          }
        />
        <Route
          path="/quiz"
          element={
            <Quiz
              quizData={quizData}
              loggedInID={loggedInID}
              userXAuth={userXAuth}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
