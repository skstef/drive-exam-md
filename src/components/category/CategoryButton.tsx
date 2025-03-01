import { Code } from "@/store/slices/exam/types/Code";
import { useTranslation } from "next-i18next";

interface ICategoryButtonProps {
  imageSrc: string;
  additionalImageSrc: string;
  categoryCode: Code;
  category: string;
  handleCategorySelection: (code: Code) => void;
  totalTime: number;
  allowedErrors: number;
}

export const CategoryButton: React.FC<ICategoryButtonProps> = ({
  imageSrc,
  categoryCode,
  handleCategorySelection,
  category,
  totalTime,
  allowedErrors,
  additionalImageSrc,
}) => {
  const { t } = useTranslation("category");

  return (
    <>
      <button
        onClick={() => handleCategorySelection(categoryCode)}
        className={`px-4 hover:bg-blue-100 rounded-lg flex overflow-hidden justify-between gap-2 items-center bg-gray-200 w-full relative`}
      >
        <img src={imageSrc} alt={category} className="w-20 h-20 -ml-4" />

        <img
          src={additionalImageSrc}
          alt={category}
          className=" absolute h-7 w-auto top-[50%] left-auto right-2 transform translate-y-[-50%]"
        />

        <div className="flex flex-col w-full">
          <div className="mx-auto flex flex-col gap-2">
            <span className="text-md font-medium">{category}</span>
          </div>
          <div className="flex flex-row justify-start">
            <img
              src={`/images/timer${totalTime}.png`}
              alt="timer"
              className="w-10 h-10 mt-auto ml-4 mb-2"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium mt-auto ml-6 mb-2">
                {t("category:allowed-mistakes")}: {allowedErrors}
              </span>
            </div>
          </div>
        </div>
      </button>
    </>
  );
};
