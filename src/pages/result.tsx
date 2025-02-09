import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import Router from "next/router";
import { resetExam } from "@/store/slices/exam/examSlice";
import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPropsContext } from "next";

const Result = () => {
  const { t } = useTranslation("result");
  const dispatch = useDispatch();
  const category = useSelector((state: RootState) => state.exam.category);
  const totalQuestions = useSelector(
    (state: RootState) => state.exam.questions?.length
  );
  const correctAnswers = useSelector(
    (state: RootState) =>
      state.exam.questions?.filter((q) => q.isAnswerCorrect).length
  );
  const isExamFailed = useSelector(
    (state: RootState) => state.exam.isExamFailed
  );

  useEffect(() => {
    if (typeof totalQuestions === "undefined") {
      Router.push("/");
    }
  }, [totalQuestions]);

  const handleRetry = () => {
    dispatch(resetExam());
    Router.push("/category");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">{t("title")}</h1>

        <p className="text-lg text-center mb-6">
          {t("category", { category })}
        </p>

        <div className="mb-6 text-center">
          <p className="text-xl font-semibold">
            {t("score", { correctAnswers, totalQuestions })}
          </p>
          <p className="text-xl font-semibold my-6">
            {t("result")}:{" "}
            <span className={isExamFailed ? "text-red-500" : "text-green-500"}>
              {isExamFailed ? t("failure") : t("success")}
            </span>
          </p>
          <p className="text-lg mt-4">
            {t("incorrect", { incorrect: totalQuestions! - correctAnswers! })}
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleRetry}
            className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
          >
            {t("retry")}
          </button>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["result"])),
    },
  };
}

export default Result;
