import Dropdown from "../component/Dropdown";
import {useLanguage} from "../context/Language";

const LanguageSelector = () => {

    const { language, setLanguage } = useLanguage()

    const handleLanguageChange = (event) => {
        const newLanguage = event.target.value;
        setLanguage(newLanguage);
    };

    return (
        <Dropdown
            options={
                [
                    { label : "🇰🇷", value: "ko" },
                    { label : "🇺🇸", value: "en" },
                ]
            }
            id="language-select"
            value={language}
            onChange={handleLanguageChange}
            border="0"
        />
    );
};

export default LanguageSelector;