import {useTheme} from "../context/Theme";
import {useTranslation} from "../context/Translation";
import {useQuery} from "react-query";
import {fetchColumnData} from "../data/APIs";
import {useCallback, useEffect} from "react";
import Area from "../component/Area";

const ConfigPopup = ({isOpen, onClose, rowData}) => {

    const { theme } = useTheme();
    const { t } = useTranslation();

    const {data: columnData, isLoading: isColumnDataLoading} = useQuery(
        ['columnData', rowData?.COL_NAME],
        () => fetchColumnData(rowData.COL_NAME),
        {
            enabled: !!rowData?.COL_NAME && isOpen,
        }
    );

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleEscKey = useCallback((event) => {
        if (event.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
        }
        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <Area className="popover-overlay">
            <Area className="popover-content">
                POPUP CONTENTS
            </Area>
        </Area>
    )
}

export default ConfigPopup;