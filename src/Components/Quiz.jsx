import React, { useEffect, useState } from "react";
import { useQuizContext } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const { questions, selectedAnswers, updateSelectedAnswer } = useQuizContext();
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let shuffledArray = [];
    if (questions) {
      questions.forEach((question) => {
        let arr = [...question.incorrect_answers, question.correct_answer];
        shuffledArray.push(shuffleArray(arr));
      });
      setShuffledAnswers(shuffledArray);
    }
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
      {questions &&
        questions.map((question, qI) => {
          const shuffledArray = shuffledAnswers[qI];
          return (
            <div key={qI} className="question mt-3">
              <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
              <div className="answers mt-2">
                {shuffledArray &&
                  shuffledArray.map((answer, answerIndex) => (
                    <button
                      key={answerIndex}
                      className={`hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent mt-2 mr-2 ${
                        isAnswerSelected(qI, answer)
                          ? "bg-green-500 text-white"
                          : ""
                      }`}
                      dangerouslySetInnerHTML={{ __html: answer }}
                      onClick={() => handleSelectAnswer(qI, answer)}
                    ></button>
                  ))}
              </div>
            </div>
          );
        })}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 disabled:bg-blue-400 disabled:cursor-not-allowed"
        onClick={handleSubmitAnswers}
        disabled={length < 5}
      >
        Submit Answers
      </button>
    </div>
  );
};

export default Quiz;
