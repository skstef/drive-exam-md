import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type ProgressBarProps = {
  initialTime: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ initialTime }) => {
  const isExamFallen = useSelector(
    (state: RootState) => state.exam.isExamFallen
  );

  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

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
