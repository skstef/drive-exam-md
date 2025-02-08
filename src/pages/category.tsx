import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import { useRouter } from "next/router";
import { setCategory } from "@/store/slices/exam/middleware/setCategory";
import { Code } from "@/store/slices/exam/types/Code";

const CategorySelector = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { language } = useSelector((state: RootState) => state.exam);

  // Handle category selection
  const handleCategorySelection = (code: Code) => {
    dispatch(setCategory({ code }));
    router.push("/exam");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Select Exam Category
        </h1>

        <p className="text-lg mb-6">Language: {language}</p>

        <div className="space-y-4">
          <button
            onClick={() => handleCategorySelection("EXAM_A1_A2_A_B1_B")}
            className="w-full px-4 py-2 text-left bg-gray-200 hover:bg-blue-100 rounded-lg"
          >
            AM, A1, A2, A, B1, B
          </button>
          <button
            onClick={() => handleCategorySelection("EXAM_C1_C")}
            className="w-full px-4 py-2 text-left bg-gray-200 hover:bg-blue-100 rounded-lg"
          >
            C1, C
          </button>
          <button
            onClick={() => handleCategorySelection("EXAM_B_E")}
            className="w-full px-4 py-2 text-left bg-gray-200 hover:bg-blue-100 rounded-lg"
          >
            BE
          </button>
          <button
            onClick={() => handleCategorySelection("EXAM_C1_E_C_E")}
            className="w-full px-4 py-2 text-left bg-gray-200 hover:bg-blue-100 rounded-lg"
          >
            C1E, CE
          </button>
          <button
            onClick={() => handleCategorySelection("EXAM_D1_E_D_E")}
            className="w-full px-4 py-2 text-left bg-gray-200 hover:bg-blue-100 rounded-lg"
          >
            D1E, DE
          </button>
          <button
            onClick={() => handleCategorySelection("EXAM_D1_D")}
            className="w-full px-4 py-2 text-left bg-gray-200 hover:bg-blue-100 rounded-lg"
          >
            D1, D
          </button>
          <button
            onClick={() => handleCategorySelection("EXAM_F")}
            className="w-full px-4 py-2 text-left bg-gray-200 hover:bg-blue-100 rounded-lg"
          >
            F
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;
