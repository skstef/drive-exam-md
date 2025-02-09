import { RootState } from "@/store";
import { setExamFailed } from "@/store/slices/exam/examSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type ProgressBarProps = {
  initialTime: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ initialTime }) => {
  const dispatch = useDispatch();

  const isExamFailed = useSelector(
    (state: RootState) => state.exam.isExamFailed
  );

  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      dispatch(setExamFailed());
      return;
    }
    if (isExamFailed) return;

    const interval = setTimeout(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearTimeout(interval);
  }, [timeLeft, isExamFailed, dispatch]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full text-center absolute top-0 left-0 right-0">
      <div className="text-sm font-semibold text-white absolute left-1/2 transform -translate-x-1/2 leading-4">
        {formatTime(timeLeft)}
      </div>
      <div className="w-full bg-blue-200 h-4 overflow-hidden">
        <div
          className="bg-blue-500 h-full transition-all"
          style={{ width: `${(timeLeft / initialTime) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
