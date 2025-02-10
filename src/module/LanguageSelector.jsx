import {useAuth} from "../context/Auth";
import Dropdown from "../component/Dropdown";

const LanguageSelector = () => {
    const { auth, setAuth } = useAuth();

    const handleLanguageChange = (event) => {
        const newLanguage = event.target.value;
        setAuth((prevAuth) => ({
            ...prevAuth,
            language: newLanguage,
        }));
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
            value={auth.language}
            onChange={handleLanguageChange}
            border="0"
        />
    );
};

export default LanguageSelector;