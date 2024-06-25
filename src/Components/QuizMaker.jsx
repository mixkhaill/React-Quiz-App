import React from "react";

const QuizMaker = ({
  categories,
  difficulties,
  selectedDifficulty,
  setSelectedDifficulty,
  setSelectedCategory,
  selectedCategory,
  handleCreateQuiz,
}) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 mt-4 mr-auto ml-auto text-center">
        Quiz Maker
      </h1>
      <div className="flex">
        <select
          id="categorySelect"
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
        >
          <option value="">Select a category</option>
          {categories?.data?.trivia_categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          id="difficultySelect"
          value={selectedDifficulty || ""}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
        >
          <option value="">Select difficulty</option>
          {difficulties.map((difficulty) => (
            <option key={difficulty} value={difficulty}>
              {difficulty}
            </option>
          ))}
        </select>
        <button
          id="createBtn"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm p-2.5 disabled:bg-blue-300"
          disabled={!selectedCategory || !selectedDifficulty}
          onClick={handleCreateQuiz}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default QuizMaker;
