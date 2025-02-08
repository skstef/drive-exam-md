interface ILanguageButtonProps {
  imageSrc: string;
  languageCode: string;
  language: string;
  handleLanguageSelection: (lang: string) => void;
  selectedLanguage: string | null;
}

export const LanguageButton: React.FC<ILanguageButtonProps> = ({
  imageSrc,
  languageCode,
  handleLanguageSelection,
  selectedLanguage,
  language,
}) => {
  return (
    <>
      <button
        onClick={() => handleLanguageSelection(languageCode)}
        className={`px-4 py-2 hover:bg-blue-100 rounded-lg flex justify-center gap-2 items-center ${
          selectedLanguage === languageCode
            ? "!bg-blue-500 text-white"
            : "bg-gray-200"
        }`}
      >
        <img src={imageSrc} alt={language} className="w-8 h-8" />
        <span className="text-md font-medium">{language}</span>
      </button>
    </>
  );
};
