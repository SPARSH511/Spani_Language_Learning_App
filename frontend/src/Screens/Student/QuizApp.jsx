import React, { useState } from "react";
import questions from "./questions";

const QuizApp = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerButtonClick = (correct) => {
    if (correct) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowScore(false);
  };

  return (
    <div className="container mt-5">
      <header className="mb-4">
        <nav className="navbar navbar-light bg-light">
          <div className="navbar-brand flex items-center">
            <h1 className="inline-block text-2xl font-bold ml-6">Spanish </h1>
            <h1 className="inline-block text-2xl font-bold ml-2">Quiz 1</h1>
          </div>
        </nav>
      </header>
      <div className="quiz-container">
        <h1 className="text-center text-3xl font-bold mb-6">Level-0</h1>
        {showScore ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              You scored {score} out of {questions.length}
            </h2>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={handleRestart}
            >
              Play Again
            </button>
          </div>
        ) : (
          <div className="quiz">
            <h2 id="question" className="mb-4 text-xl mx-6">
              {questions[currentQuestionIndex].question}
            </h2>
            <div id="answer-buttons" className="flex flex-col space-y-2 mx-6">
              {questions[currentQuestionIndex].answers.map((answer, index) => (
                <button
                  key={index}
                  className="border border-blue-500 text-blue-500 py-2 px-4 rounded hover:bg-blue-500 hover:text-white"
                  onClick={() => handleAnswerButtonClick(answer.correct)}
                >
                  {answer.text}
                </button>
              ))}
            </div>
            <button
              id="next-btn"
              className="bg-gray-500 text-white py-2 px-4 rounded mt-4 ml-6"
              onClick={() => handleAnswerButtonClick(null)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizApp;
