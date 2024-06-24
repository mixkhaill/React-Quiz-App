import React, { createContext, useState, useContext } from "react";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState([]);

  const updateQuestions = (newQuestions) => {
    setQuestions(newQuestions);
    const corrects = newQuestions.map((q) => q.correct_answer);
    setCorrectAnswers(corrects);
  };

  const updateSelectedAnswer = (questionIndex, answer) => {
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = { ...prevAnswers };

      if (updatedAnswers[questionIndex] === answer) {
        delete updatedAnswers[questionIndex];
      } else {
        updatedAnswers[questionIndex] = answer;
      }

      return updatedAnswers;
    });
  };

  const updateCorrectAnswers = (answers) => {
    setCorrectAnswers(answers);
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        selectedAnswers,
        correctAnswers,
        updateQuestions,
        updateSelectedAnswer,
        updateCorrectAnswers,
        setSelectedAnswers,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuizContext must be used within a QuizProvider");
  }
  return context;
};
