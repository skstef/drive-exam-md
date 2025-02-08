// components/ExamProgress.tsx
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const ExamProgress = () => {
  const { currentQuestion, totalQuestions, errors } = useSelector(
    (state: RootState) => state.exam
  );

  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md">
      <div>
        <span className="text-lg font-semibold">
          Question {currentQuestion}/{totalQuestions}
        </span>
      </div>
      <div className="w-1/2 bg-gray-300 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div>
        <span className="text-lg font-semibold text-red-500">
          Errors: {errors}
        </span>
      </div>
    </div>
  );
};

export default ExamProgress;
