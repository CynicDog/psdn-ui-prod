import { useAuth } from "../Context";

const Language = () => {
    const { auth, setAuth } = useAuth();

    const handleLanguageChange = (event) => {
        const newLanguage = event.target.value;
        setAuth((prevAuth) => ({
            ...prevAuth,
            language: newLanguage,
        }));
    };

    return (
        <div className="language-selector">
            <select
                className="border-0 bg-body"
                id="language-select"
                value={auth.language}
                onChange={handleLanguageChange}
            >
                <option value="ko">🇰🇷</option>
                <option value="en">🇺🇸</option>
            </select>
        </div>
    );
};

export default Language;
