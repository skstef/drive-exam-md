import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setLanguage } from "../store/slices/exam/examSlice";
import { useTranslation } from "next-i18next";
import { LanguageButton } from "@/components/languages/LanguageButton";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const selectedLanguage = useSelector(
    (state: RootState) => state.exam.language
  );

  // Handle language selection
  const handleLanguageSelection = async (language: string) => {
    dispatch(setLanguage(language));
    await i18n.changeLanguage(language);
    router.push("/category");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg  shadow-xl w-full max-w-md">
        <h1 className="text-xl font-bold text-center mb-3">Alegeți limba:</h1>
        {/* <h1 className="text-xl font-bold text-center mb-3">Select language:</h1> */}
        <h1 className="text-xl font-bold text-center mb-12">Выберите язык:</h1>

        <div className="mb-6">
          <div className="flex flex-col gap-4 justify-around">
            {/* <LanguageButton
              languageCode="en"
              language={"English"}
              imageSrc="/images/flag_united_kingdom.png"
              handleLanguageSelection={handleLanguageSelection}
              selectedLanguage={selectedLanguage}
            /> */}
            <LanguageButton
              languageCode="ro"
              language={"Romîna"}
              imageSrc="/images/flag_moldova.png"
              handleLanguageSelection={handleLanguageSelection}
              selectedLanguage={selectedLanguage}
            />
            <LanguageButton
              languageCode="ru"
              language={"Русский"}
              imageSrc="/images/flag_russia.png"
              handleLanguageSelection={handleLanguageSelection}
              selectedLanguage={selectedLanguage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
