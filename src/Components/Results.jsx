import React, { useEffect } from "react";
import { useQuizContext } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const {
    questions,
    correctAnswers,
    selectedAnswers,
    shuffledQuestions,
    resetQuiz,
  } = useQuizContext();

  useEffect(() => {
    if (questions.length < 1) {
      navigateTo("/");
    }
  }, []);

  const correctSelectedAnswers = Object.keys(selectedAnswers)
    .filter((key) => selectedAnswers[key] === correctAnswers[key])
    .map((key) => selectedAnswers[key]);

  const navigateTo = useNavigate();

  const getClassName = (answer, questionIndex) => {
    if (answer === questions[questionIndex].correct_answer) {
      return "bg-green-500 text-white";
    } else if (answer === selectedAnswers[questionIndex]) {
      return "bg-red-500 text-white border-red-500";
    } else {
      return "text-green-700";
    }
  };

  const handleReturn = () => {
    resetQuiz();
    navigateTo("/");
  };

  return (
    <div className="container mx-auto pl-4 pr-4">
      <h1 className="text-3xl font-bold mb-4 mt-4 mr-auto ml-auto text-center">
        Results
      </h1>
      <div className="mt-3">
        {questions.map((question, qIndex) => {
          const shuffledAnswers = shuffledQuestions[qIndex];
          return (
            <div key={qIndex} className="question mt-3">
              <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
              <div className="answers mt-2">
                {shuffledAnswers &&
                  shuffledAnswers.map((answer, answerIndex) => (
                    <button
                      key={answerIndex}
                      className={`text-green-700 font-semibold py-2 px-4 border border-green-500 rounded mt-2 mr-2 ${getClassName(
                        answer,
                        qIndex
                      )}`}
                      dangerouslySetInnerHTML={{ __html: answer }}
                      disabled
                    ></button>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
      <p
        className={`mt-10 inline-block py-2 px-4 text-white ${
          correctSelectedAnswers.length < 2
            ? "bg-red-600"
            : correctSelectedAnswers.length >= 2 &&
              correctSelectedAnswers.length <= 3
            ? "bg-yellow-500"
            : "bg-green-600"
        }`}
      >
        You scored {correctSelectedAnswers.length} out of {questions.length}
      </p>
      <button
        id="createNewQuizBtn"
        type="button"
        className="flex items-center justify-center text-white bg-gray-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-semibold rounded ml-auto mr-auto mt-5 p-4 center-center"
        onClick={handleReturn}
      >
        Create a new quiz
      </button>
    </div>
  );
};

export default Results;
