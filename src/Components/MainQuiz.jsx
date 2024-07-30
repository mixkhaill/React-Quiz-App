import React, { useEffect, useState } from "react";
import { useQuizContext } from "../context/QuizContext";
import QuizMaker from "./QuizMaker";
import Quiz from "./Quiz";
import useFetchData from "./../utils/useFetchData";

const MainQuiz = () => {
  const categories = useFetchData("https://opentdb.com/api_category.php");
  const { updateQuestions, questions, setSelectedAnswers, resetQuiz } =
    useQuizContext();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const difficulties = ["Easy", "Medium", "Hard"];
  const [error, setError] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") {
      resetQuiz();
    }
  }, [location.pathname]);

  const fetchQuizQuestions = async () => {
    const url = `https://opentdb.com/api.php?amount=5&category=${selectedCategory}&difficulty=${selectedDifficulty.toLowerCase()}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        setError(true);
      }

      if (response.ok) {
        setError(false);
      }

      const data = await response.json();
      updateQuestions(data.results);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCreateQuiz = () => {
    fetchQuizQuestions();
    setSelectedAnswers({});
  };

  return (
    <>
      <QuizMaker
        categories={categories}
        difficulties={difficulties}
        selectedCategory={selectedCategory}
        selectedDifficulty={selectedDifficulty}
        setSelectedCategory={setSelectedCategory}
        setSelectedDifficulty={setSelectedDifficulty}
        handleCreateQuiz={handleCreateQuiz}
      />
      {error ? (
        <h2 className="text-2xl text-bold m-4">
          Something went wrong! try again later!
        </h2>
      ) : (
        questions && questions.length > 0 && <Quiz />
      )}
    </>
  );
};

export default MainQuiz;
