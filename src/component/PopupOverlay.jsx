import { useEffect, useCallback } from "react";
import { useTheme } from "../context/Theme";

const PopupOverlay = ({ children, setIsPopupOpen }) => {
    const { theme } = useTheme();

    // Close popup function
    const closePopup = () => {
        setIsPopupOpen(false);
    };

    // // Handle Escape key press to close popup
    // const handleEscKey = useCallback((event) => {
    //     if (event.key === 'Escape') {
    //         closePopup();
    //     }
    // }, []);

    useEffect(() => {
        // Lock body scroll when popup is open
        document.body.style.overflow = 'hidden';
        // document.addEventListener('keydown', handleEscKey);

        return () => {
            document.body.style.overflow = '';
            // document.removeEventListener('keydown', handleEscKey);
        };
    }, []);

    return (
        <div
            className="popup-overlay"
            style={{
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)',
            }}
            onClick={closePopup}
        >
            {children}
        </div>
    );
};

export default PopupOverlay;
