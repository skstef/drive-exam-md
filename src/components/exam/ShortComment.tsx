import { RootState } from "@/store";
import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";

export const ShortComment: React.FC = () => {
  const { t } = useTranslation("exam");
  const currentQuestion = useSelector((state: RootState) =>
    state.exam.questions
      ? state.exam.questions[state.exam.currentQuestion ?? 0]
      : null
  );

  if (currentQuestion?.isAnswered && !currentQuestion.isAnswerCorrect) {
    return (
      <div className="bg-red-100 p-4 rounded-lg mt-4">
        <p>{t("exam:hint")}:</p>
        <p className="text-sm">{currentQuestion.hint}</p>
      </div>
    );
  }

  return null;
};
