import { RootState } from "@/store";
import Router, { useRouter } from "next/router";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";

interface IAppGuardProps {
  children: React.ReactNode;
}

export const AppGuarg: React.FC<IAppGuardProps> = ({ children }) => {
  const router = useRouter();

  const selectedCategory = useSelector(
    (state: RootState) => state.exam.category
  );
  const selectedLanguage = useSelector(
    (state: RootState) => state.exam.language
  );
  const isLastQuestionAnswered = useSelector((state: RootState) =>
    state.exam.questions
      ? state.exam.questions[state.exam.questions.length - 1].isAnswered
      : false
  );

  useLayoutEffect(() => {
    if (
      router.asPath === "/exam" &&
      (selectedLanguage === null || selectedCategory === null)
    ) {
      Router.push("/");
    }

    if (
      router.asPath === "/result" &&
      (selectedLanguage === null ||
        selectedCategory === null ||
        !isLastQuestionAnswered)
    ) {
      Router.push("/");
    }

    if (router.asPath === "/category" && selectedLanguage === null) {
      Router.push("/");
    }
  }, [
    isLastQuestionAnswered,
    router.asPath,
    selectedCategory,
    selectedLanguage,
  ]);

  return children;
};
