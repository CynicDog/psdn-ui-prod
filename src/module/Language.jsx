import {useAuth} from "../context/Auth";
import Select from "../component/Select";

const Language = () => {
    const { auth, setAuth } = useAuth();

    const languageOptions = [
        { label : "🇰🇷", value: "ko" },
        { label : "🇺🇸", value: "en" },
    ]

    const handleLanguageChange = (event) => {
        const newLanguage = event.target.value;
        setAuth((prevAuth) => ({
            ...prevAuth,
            language: newLanguage,
        }));
    };

    return (
        <>
            <Select
                options={languageOptions}
                id="language-select"
                value={auth.language}
                onChange={handleLanguageChange}
            />
        </>
    );
};

export default Language;