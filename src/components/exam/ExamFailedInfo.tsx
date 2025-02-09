import { RootState, useAppDispatch } from "@/store";
import { resetExam } from "@/store/slices/exam/examSlice";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useSelector } from "react-redux";

export const ExamFailedInfo: React.FC = () => {
  const { t } = useTranslation("exam");
  const dispatch = useAppDispatch();
  const isExamFailed = useSelector(
    (state: RootState) => state.exam.isExamFailed
  );
  const failedCause = useSelector((state: RootState) => state.exam.failedCause);

  const handleRestartExam = () => {
    dispatch(resetExam());
  };

  if (isExamFailed) {
    return (
      <div className="bg-red-500 p-4 -mt-4 mb-8 w-[calc(100%+4rem)] -mx-8">
        <p className="text-white">{t(`exam:failed_${failedCause}`)}</p>
        <Link
          onClick={handleRestartExam}
          className="text-white underline underline-offset-2"
          href="/category"
        >
          {t("try_again")}
        </Link>
      </div>
    );
  }

  return null;
};
