import {useTheme} from "../context/Theme";
import {useTranslation} from "../context/Translation";
import {useQuery} from "react-query";
import {fetchColumnData} from "../data/APIs";
import {useCallback, useEffect} from "react";
import Area from "../component/Area";
import {useLayout} from "../context/Layout";
import PopupOverlay from "../component/PopupOverlay";
import PopupContent from "../component/PopupContent";
import Span from "../component/Span";
import Button from "../component/Button";
import {useConfig} from "../context/Config";

const ConfigPopup = () => {
    const { t } = useTranslation();
    const { isPopupOpen, setIsPopupOpen } = useLayout();

    const { focusedRow } = useConfig();

    const closePopup = () => {
        setIsPopupOpen(false);
    }

    const {data: columnData, isLoading: isColumnDataLoading} = useQuery(
        ['columnData', focusedRow?.COL_NAME],
        () => fetchColumnData(focusedRow.COL_NAME),
        {
            enabled: !!focusedRow?.COL_NAME && isPopupOpen,
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
            closePopup();
        }
    }, [closePopup]);

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
        <PopupOverlay onClick={closePopup}>
            <PopupContent>
                {/* Popup Header */}
                <Area>
                    <Area flex justifyContent="between">
                        <Span fontSize="4">
                            {t('components.record_detail_title')}
                        </Span>
                        <Button size="sm" variant="light" onClick={closePopup}>
                            {t('components.close')}
                        </Button>
                    </Area>
                    <Area flex justifyContent="center">
                        <Span fontSize="3" fontWeight="lighter">{focusedRow.COL_NAME}</Span>
                    </Area>
                </Area>

                {/* Popup Body */}
                {Array.isArray(focusedRow.RULES) && focusedRow.RULES.length > 0 ? (
                    <Area>
                        Chart control here..
                    </Area>
                ) : (
                    <Area flex justifyContent="center" alignItems="center">
                        <Span variant="secondary">
                            {t('components.no_rules_to_apply')}
                        </Span>
                    </Area>
                )}

            </PopupContent>
        </PopupOverlay>
    )
}

export default ConfigPopup;