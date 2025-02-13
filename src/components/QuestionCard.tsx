// components/QuestionCard.tsx
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setAnswer, nextQuestion } from "../store/slices/exam/examSlice";

interface QuestionCardProps {
  questionText: string;
  options: string[];
  image?: string;
  correctAnswer: string;
  questionIndex: number;
}

const QuestionCard = ({
  questionText,
  options,
  image,
  correctAnswer,
  questionIndex,
}: QuestionCardProps) => {
  const dispatch = useDispatch();
  const { answers, currentQuestion, errors } = useSelector(
    (state: RootState) => state.exam
  );
  const currentAnswer = answers[questionIndex];

  const handleAnswerSelection = (selectedAnswer: string) => {
    dispatch(setAnswer({ index: questionIndex, answer: selectedAnswer }));
  };

  const handleNextQuestion = () => {
    dispatch(nextQuestion());
  };

  const isLastQuestion = currentQuestion === options.length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">{questionText}</h2>

      {image && (
        <img
          src={image}
          alt="Question Image"
          className="w-full h-auto mb-4 rounded-lg"
        />
      )}

      <div className="space-y-3 mb-6">
        {options.map((option, idx) => (
          <button
            key={idx}
            className={`w-full px-4 py-2 text-left rounded-lg ${
              currentAnswer === option
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-blue-100"
            }`}
            onClick={() => handleAnswerSelection(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleNextQuestion}
          disabled={isLastQuestion}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 disabled:bg-gray-300"
        >
          Next Question
        </button>
        {errors > 2 && (
          <div className="text-red-500 font-semibold">
            You have reached the maximum allowed errors.
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
