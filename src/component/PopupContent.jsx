import { useTheme } from "../context/Theme";

const PopupContent = ({ children, onClick }) => {
    const { theme } = useTheme();

    return (
        <div
            className="rounded-4 popup-content"
            style={{
                backgroundColor: theme === 'dark' ? '#202020' : '#FFFFFF',
            }}
            onClick={(e) => {
                e.stopPropagation();
                if (onClick) onClick(e);
            }}
        >
            {children}
        </div>
    );
};

export default PopupContent;
