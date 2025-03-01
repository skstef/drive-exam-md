import { RootState } from "@/store";
import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";

export const ExamFallenInfo: React.FC = () => {
  const { t } = useTranslation("exam");
  const isExamFallen = useSelector(
    (state: RootState) => state.exam.isExamFallen
  );

  if (isExamFallen) {
    return (
      <div className="bg-red-500 p-4 -mt-4 mb-8 w-[calc(100%+4rem)] -mx-8">
        <p className="text-white">{t("fallen")}:</p>
      </div>
    );
  }

  return null;
};
