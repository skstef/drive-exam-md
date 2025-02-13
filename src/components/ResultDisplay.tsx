// components/ResultDisplay.tsx
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useRouter } from "next/router";
import { resetExam } from "../store/slices/exam/examSlice";

const ResultDisplay = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { answers, errors, totalQuestions, category } = useSelector(
    (state: RootState) => state.exam
  );

  // Calculate the number of correct answers
  const correctAnswers = answers.filter((answer, index) => {
    // Assuming you have a method to get the correct answer for each question
    // If not, you'd need to manage this in the state or question data
    const correctAnswer = getCorrectAnswer(index);
    return answer === correctAnswer;
  }).length;

  // Calculate the score (percentage)
  const score = (correctAnswers / totalQuestions) * 100;

  // Function to get the correct answer for a question
  const getCorrectAnswer = (index: number) => {
    // Example hardcoded correct answers (you'd replace this with real logic or data)
    const correctAnswers = [
      "Option A", // Question 1 correct answer
      "Option B", // Question 2 correct answer
      // Add all other correct answers
    ];
    return correctAnswers[index];
  };

  const handleRestartExam = () => {
    // Reset exam state (e.g., answers, errors, currentQuestion) and go back to the language selection
    dispatch(resetExam());
    router.push("/language-selector");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Your Exam Results</h2>

      <div className="mb-4">
        <p className="text-lg">Category: {category}</p>
        <p className="text-lg">Total Questions: {totalQuestions}</p>
        <p className="text-lg">Correct Answers: {correctAnswers}</p>
        <p className="text-lg">Errors: {errors}</p>
        <p className="text-lg font-semibold text-blue-600">
          Your Score: {score.toFixed(2)}%
        </p>
      </div>

      {errors > 2 && (
        <div className="text-red-500 font-semibold mb-4">
          You have exceeded the maximum allowed errors!
        </div>
      )}

      <div className="flex space-x-4">
        <button
          onClick={handleRestartExam}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Restart Exam
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;
