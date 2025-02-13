// components/LanguageSelector.tsx
import { useDispatch } from "react-redux";
import { setLanguage } from "@/store/slices/exam/examSlice";
import { useRouter } from "next/router";

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLanguageChange = (language: string) => {
    dispatch(setLanguage(language)); // Redux action to set the language
    router.push("/exam"); // Navigate to the exam page after selection
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold mb-8">Select Your Language</h1>
      <div className="flex space-x-4">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
          onClick={() => handleLanguageChange("en")}
        >
          English
        </button>
        <button
          className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600"
          onClick={() => handleLanguageChange("ro")}
        >
          Romanian
        </button>
        <button
          className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600"
          onClick={() => handleLanguageChange("ru")}
        >
          Russian
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;
