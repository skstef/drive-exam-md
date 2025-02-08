import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import Router from "next/router";
import { setCategory } from "@/store/slices/exam/middleware/setCategory";
import { Code } from "@/store/slices/exam/types/Code";
import { CategoryButton } from "@/components/category/CategoryButton";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { CATEGORIES } from "@/config/categories";

const CategorySelector = () => {
  const dispatch = useAppDispatch();
  const selectedLanguage = useSelector(
    (state: RootState) => state.exam.language
  );
  const { t } = useTranslation("category");

  useEffect(() => {
    if (selectedLanguage === null) {
      Router.push("/");
    }
  }, [selectedLanguage]);

  // Handle category selection
  const handleCategorySelection = (code: Code) => {
    dispatch(setCategory({ code }));
    Router.push("/exam");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {t("category:select_category")}
        </h1>

        <div className="space-y-4">
          {CATEGORIES.map((category) => (
            <CategoryButton
              key={category.title}
              category={category.title}
              imageSrc={category.image}
              totalTime={category.totalTime}
              categoryCode={category.categoryCode}
              allowedErrors={category.allowedErrors}
              additionalImageSrc={category.additionalImage}
              handleCategorySelection={handleCategorySelection}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;
