import { RootState } from "@/store";
import { numberToStringWithLeadingZero } from "@/store/utils/numberToStringWithLeadingZero";
import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";

export const QuestionImage: React.FC = () => {
  const currentQuestion = useSelector((state: RootState) =>
    state.exam.questions
      ? state.exam.questions[state.exam.currentQuestion ?? 0]
      : null
  );

  const [hasError, setHasError] = useState(false);

  useLayoutEffect(() => {
    setHasError(false);
  }, [currentQuestion?.question]);

  if (!currentQuestion) {
    return null;
  }

  const imageSrc = `/images/c${numberToStringWithLeadingZero(
    currentQuestion?.order_content,
    2
  )}_s${numberToStringWithLeadingZero(
    currentQuestion?.order_subject,
    2
  )}_t${numberToStringWithLeadingZero(currentQuestion?.order_ticket, 3)}.jpg`;

  return !hasError ? (
    <img src={imageSrc} alt="Question" onError={() => setHasError(true)} />
  ) : null;
};
