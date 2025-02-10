import {useTheme} from "../context/Theme";

const PopupOverlay = ({ children, onClick }) => {

    const { theme } = useTheme();

    return (
        <div
            className="popup-overlay"
            style={{
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)',
            }}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

export default PopupOverlay;