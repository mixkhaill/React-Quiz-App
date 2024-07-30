import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainQuiz from "./Components/MainQuiz";
import Results from "./Components/Results";
import { QuizProvider } from "./context/QuizContext";

function App() {
  return (
    <QuizProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainQuiz />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </BrowserRouter>
    </QuizProvider>
  );
}

export default App;
