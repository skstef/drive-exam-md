import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { nextQuestion } from "../store/slices/exam/examSlice";
import ProgressBar from "@/components/exam/ProgressBar";
import { useTranslation } from "next-i18next";
import Router from "next/router";
import { useEffect } from "react";
import { QuestionImage } from "@/components/exam/QuestionImage";
import { ResponseButton } from "@/components/exam/ResponseButton";
import { ShortComment } from "@/components/exam/ShortComment";
import { QuestionsNavigation } from "@/components/exam/QuestionsNavigation";
import { ExamFailedInfo } from "@/components/exam/ExamFailedInfo";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Exam = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["exam", "common"]);
  const selectedCategory = useSelector(
    (state: RootState) => state.exam.category
  );
  const selectedLanguage = useSelector(
    (state: RootState) => state.exam.language
  );
  const totalQuestions = useSelector(
    (state: RootState) => state.exam.totalQuestions!
  );
  const currentQuestionIndex = useSelector(
    (state: RootState) => state.exam.currentQuestion!
  );
  const totalTime = useSelector((state: RootState) => state.exam.totalTime);
  const currentQuestion = useSelector((state: RootState) =>
    state.exam.questions ? state.exam.questions[currentQuestionIndex] : null
  );

  const responses = [
    currentQuestion?.response_01,
    currentQuestion?.response_02,
    currentQuestion?.response_03,
    currentQuestion?.response_04,
    currentQuestion?.response_05,
  ].filter((el) => (el?.length ?? 0) > 0);

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < totalQuestions) {
      dispatch(nextQuestion());
    } else {
      Router.push("/result");
    }
  };

  useEffect(() => {
    if (selectedLanguage === null || selectedCategory === null) {
      Router.push("/");
    }
  }, [selectedCategory, selectedLanguage]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-xl relative my-2">
        <ProgressBar initialTime={totalTime! * 60} />
        <ExamFailedInfo />
        <h1 className="text-2xl font-bold text-center mb-6">
          {t("exam:category")}: {t(`common:${selectedCategory}`)}
        </h1>

        <div>
          <QuestionImage />
          <p className="text-xl font-semibold mt-2 mb-4">
            {currentQuestion?.question}
          </p>

          <div className="space-y-4">
            {responses.map((option, index) => (
              <ResponseButton
                key={index}
                option={option!}
                index={index}
                isQuestionAnswered={currentQuestion?.isAnswered}
              />
            ))}
          </div>
          <ShortComment />

          <div className="mt-6">
            <button
              disabled={!currentQuestion?.isAnswered}
              onClick={handleNextQuestion}
              className="w-full px-6 py-2 bg-blue-500 disabled:bg-blue-500/50 disabled:cursor-no-drop text-white rounded-lg hover:bg-blue-600 cursor-pointer"
            >
              {currentQuestionIndex + 1 < totalQuestions
                ? t("exam:next_question")
                : t("exam:result")}
            </button>
          </div>

          <QuestionsNavigation />
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "exam"])),
    },
  };
}

export default Exam;
