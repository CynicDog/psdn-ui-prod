import {useTheme} from "../context/Theme";
import {useTranslation} from "../context/Translation";
import {useQuery} from "react-query";
import {fetchColumnData} from "../data/APIs";
import {useCallback, useEffect} from "react";
import Area from "../component/Area";
import {useLayout} from "../context/Layout";
import PopupOverlay from "../component/PopupOverlay";
import PopupContent from "../component/PopupContent";

const ConfigPopup = ({rowData}) => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const { isPopupOpen, setIsPopupOpen } = useLayout();

    const onClose = () => {
        setIsPopupOpen(false);
    }

    const {data: columnData, isLoading: isColumnDataLoading} = useQuery(
        ['columnData', rowData?.COL_NAME],
        () => fetchColumnData(rowData.COL_NAME),
        {
            enabled: !!rowData?.COL_NAME && isPopupOpen,
        }
    );

    useEffect(() => {
        if (isPopupOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isPopupOpen]);

    const handleEscKey = useCallback((event) => {
        if (event.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (isPopupOpen) {
            document.addEventListener('keydown', handleEscKey);
        }
        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isPopupOpen]);

    if (!isPopupOpen) return null;

    return (
        <PopupOverlay onClick={onClose}>
            <PopupContent>
                POPUP CONTENTS
            </PopupContent>
        </PopupOverlay>
    )
}

export default ConfigPopup;