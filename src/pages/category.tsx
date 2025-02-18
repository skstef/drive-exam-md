import { useAppDispatch } from "../store";
import Router from "next/router";
import { setCategory } from "@/store/slices/exam/middleware/setCategory";
import { Code } from "@/store/slices/exam/types/Code";
import { CategoryButton } from "@/components/category/CategoryButton";
import { useTranslation } from "next-i18next";
import { CATEGORIES } from "@/config/categories";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const CategorySelector = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("category");

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

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["category"])),
    },
  };
}

export default CategorySelector;
