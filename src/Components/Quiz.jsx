import React, { useEffect, useState } from "react";
import { useQuizContext } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const {
    questions,
    selectedAnswers,
    updateSelectedAnswer,
    shuffledQuestions,
    setShuffledQuestions,
  } = useQuizContext();
  const [shuffledAnswersList, setShuffledAnswersList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let shuffledAnswersArray = [];
    questions.forEach((question) => {
      let answers = [...question.incorrect_answers, question.correct_answer];
      shuffledAnswersArray.push(shuffleArray(answers));
    });
    setShuffledAnswersList(shuffledAnswersArray);
    setShuffledQuestions(shuffledAnswersArray);
  }, [questions]);

  const isAnswerSelected = (questionIndex, answer) => {
    return selectedAnswers[questionIndex] === answer;
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleSelectAnswer = (questionIndex, answer) => {
    updateSelectedAnswer(questionIndex, answer);
  };

  const handleSubmitAnswers = () => {
    navigate("/results");
  };

  const length = Object.keys(selectedAnswers).length;

  return (
    <div className="container mx-auto pr-4 pl-4">
      {questions?.map((question, questionIndex) => {
        const shuffledAnswers = shuffledQuestions[questionIndex];
        return (
          <div key={questionIndex} className="question mt-3">
            <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
            <div className="answers mt-2">
              {shuffledAnswers &&
                shuffledAnswers.map((answer, answerIndex) => (
                  <button
                    key={answerIndex}
                    className={`hover:bg-green-600 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-600 hover:border-transparent rounded mt-2 mr-2 ${
                      isAnswerSelected(questionIndex, answer)
                        ? "bg-green-600 text-white"
                        : ""
                    }`}
                    dangerouslySetInnerHTML={{ __html: answer }}
                    onClick={() => handleSelectAnswer(questionIndex, answer)}
                  ></button>
                ))}
            </div>
          </div>
        );
      })}
      {!(length < 5) && (
        <button
          id="submitQuizBtn"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 disabled:bg-blue-300 disabled:cursor-not-allowed"
          onClick={handleSubmitAnswers}
          disabled={length < 5}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default Quiz;
