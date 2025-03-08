import { RootState } from "@/store";
import { setAnswer } from "@/store/slices/exam/examSlice";
import { useDispatch, useSelector } from "react-redux";

interface IResponseButtonProps {
  isQuestionAnswered?: boolean;
  option: string;
  index: number;
}

export const ResponseButton: React.FC<IResponseButtonProps> = ({
  option,
  index,
  isQuestionAnswered,
}) => {
  const dispatch = useDispatch();

  const currentQuestion = useSelector((state: RootState) =>
    state.exam.questions
      ? state.exam.questions[state.exam.currentQuestion ?? 0]
      : null
  );

  const handleAnswerSelection = (answer: number) => {
    dispatch(setAnswer({ answer }));
  };

  const isAnswerCorrect = currentQuestion?.isAnswerCorrect;
  const isAnswerSelected = currentQuestion?.answer === index;

  return (
    <button
      onClick={() => handleAnswerSelection(index)}
      disabled={isQuestionAnswered}
      className={`w-full px-4 py-2 text-left bg-gray-200 hover:bg-blue-100 rounded-lg ${
        isAnswerSelected
          ? isAnswerCorrect
            ? "!bg-green-500 text-white"
            : "!bg-red-500 text-white"
          : null
      }`}
    >
      {option}
    </button>
  );
};
