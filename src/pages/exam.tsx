// src/pages/exam.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  setAnswer,
  nextQuestion,
  setErrors,
} from "../store/slices/exam/examSlice";
import { useRouter } from "next/router";

const Exam = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { category, language, currentQuestion, answers, errors } = useSelector(
    (state: RootState) => state.exam
  );
  const [questionData, setQuestionData] = useState<any[]>([]); // Assume you have question data per category
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Load the questions based on the selected category
  useEffect(() => {
    const fetchQuestions = async () => {
      // Example hardcoded question data, replace with API or static data
      const questions = {
        A1: [
          {
            question: "What is the speed limit in urban areas?",
            options: ["30 km/h", "50 km/h", "80 km/h"],
            correct: "50 km/h",
          },
          {
            question: "When should you use your horn?",
            options: [
              "In traffic jams",
              "To warn other drivers of danger",
              "To greet people",
            ],
            correct: "To warn other drivers of danger",
          },
        ],
        B: [
          {
            question: "What is the legal alcohol limit?",
            options: ["0.2 g/L", "0.5 g/L", "1.0 g/L"],
            correct: "0.5 g/L",
          },
          {
            question: "How far should you park from a junction?",
            options: ["5 meters", "10 meters", "15 meters"],
            correct: "10 meters",
          },
        ],
        // Add other categories...
      };

      setQuestionData(questions[category] || []);
    };

    fetchQuestions();
  }, [category]);

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    dispatch(setAnswer({ index: currentQuestion - 1, answer: selectedAnswer }));

    // Check if the answer is correct and update the error count
    const correctAnswer = questionData[currentQuestion - 1]?.correct;
    if (selectedAnswer !== correctAnswer) {
      dispatch(setErrors(errors + 1));
    }

    // Move to the next question
    if (currentQuestion < questionData.length) {
      dispatch(nextQuestion());
    } else {
      // Redirect to results page after the last question
      router.push("/result");
    }

    // Reset the selected answer for the next question
    setSelectedAnswer(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-xl">
        <h1 className="text-2xl font-bold text-center mb-6">
          Exam: {category}
        </h1>
        <p className="text-lg text-center mb-4">Language: {language}</p>

        {questionData.length > 0 && currentQuestion <= questionData.length ? (
          <div>
            <div className="mb-4">
              <p className="text-xl font-semibold">
                {questionData[currentQuestion - 1]?.question}
              </p>
            </div>

            <div className="space-y-4">
              {questionData[currentQuestion - 1]?.options.map(
                (option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelection(option)}
                    className={`w-full px-4 py-2 text-left bg-gray-200 hover:bg-blue-100 rounded-lg ${
                      selectedAnswer === option ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    {option}
                  </button>
                )
              )}
            </div>

            <div className="mt-6">
              <button
                onClick={handleNextQuestion}
                className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Next Question
              </button>
            </div>
          </div>
        ) : (
          <p className="text-lg">Loading questions...</p>
        )}
      </div>
    </div>
  );
};

export default Exam;
