import { RootState } from "@/store";
import classNames from "classnames";
import { useSelector } from "react-redux";

export const QuestionsNavigation = () => {
  const questions = useSelector((state: RootState) => state.exam.questions);

  return (
    <div className="grid grid-cols-8 gap-2 mt-12">
      {questions?.map((el, index) => (
        <div
          key={index}
          className={classNames(
            "bg-gray-200 max-w-12 w-full rounded-lg py-2 mr-2 mb-2 text-center",
            el.isAnswered
              ? el.isAnswerCorrect
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
              : null
          )}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};
