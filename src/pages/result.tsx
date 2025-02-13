// src/pages/result.tsx
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useRouter } from "next/router";

const Result = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { category, language, answers, errors } = useSelector(
    (state: RootState) => state.exam
  );

  const totalQuestions = answers.length; // The total number of questions in the selected category
  const correctAnswers = totalQuestions - errors; // Correct answers = total questions - errors

  const handleRetry = () => {
    // Reset the exam state and navigate back to the language selection or category selection page
    dispatch({ type: "exam/reset" });
    router.push("/"); // Or redirect to the category selection page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-xl">
        <h1 className="text-2xl font-bold text-center mb-6">Exam Results</h1>

        <p className="text-lg text-center mb-4">Language: {language}</p>
        <p className="text-lg text-center mb-6">Category: {category}</p>

        <div className="mb-6 text-center">
          <p className="text-xl font-semibold">
            You answered {correctAnswers} out of {totalQuestions} correctly!
          </p>
          <p className="text-lg mt-4">You had {errors} incorrect answers.</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleRetry}
            className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry Exam
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-full px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Go Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
