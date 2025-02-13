import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setLanguage } from "../store/slices/exam/examSlice";
import { useTranslation } from "react-i18next";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const { language } = useSelector((state: RootState) => state.exam);

  // Handle language selection
  const handleLanguageSelection = (language: string) => {
    dispatch(setLanguage(language));
    i18n.changeLanguage(language);
    router.push("/category"); // Navigate to category selection after language is set
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg  shadow-xl w-full max-w-md">
        <h1 className="text-xl font-bold text-center mb-3">Alegeți limba:</h1>
        <h1 className="text-xl font-bold text-center mb-3">Select language:</h1>
        <h1 className="text-xl font-bold text-center mb-12">Выберите язык:</h1>

        <div className="mb-6">
          <div className="flex flex-col gap-4 justify-around">
            <button
              onClick={() => handleLanguageSelection("en")}
              className={`px-4 py-2 hover:bg-blue-100 rounded-lg flex justify-center gap-2 items-center ${
                language === "en" ? "!bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              <img
                src="/images/flag_united_kingdom.png"
                alt="English"
                className="w-8 h-8"
              />
              <span className="text-md font-medium">English</span>
            </button>
            <button
              onClick={() => handleLanguageSelection("ro")}
              className={`px-4 py-2 hover:bg-blue-100 rounded-lg flex justify-center gap-2 items-center ${
                language === "ro" ? "!bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              <img
                src="/images/flag_moldova.png"
                alt="English"
                className="w-8 h-8"
              />
              <span className="text-md font-medium">Româna</span>
            </button>
            <button
              onClick={() => handleLanguageSelection("ru")}
              className={`px-4 py-2 hover:bg-blue-100 rounded-lg flex justify-center gap-2 items-center ${
                language === "ru" ? "!bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              <img
                src="/images/flag_russia.png"
                alt="English"
                className="w-8 h-8"
              />
              <span className="text-md font-medium">Русский</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
