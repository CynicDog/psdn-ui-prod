import {useQuery} from "react-query";
import {fetchColumnData} from "../../data/APIs";
import Area from "../../component/Area";
import PopupOverlay from "../../component/PopupOverlay";
import PopupContent from "../../component/PopupContent";
import Span from "../../component/Span";
import Button from "../../component/Button";
import {useConfig} from "../../context/Config";
import {useLanguage} from "../../context/Language";
import ChartControl from "../../charts/ChartControl";
import {usePopup} from "../../context/Popup";
import PopupHeader from "../../component/PopupHeader";
import PopupBody from "../../component/PopupBody";

const ConfigPopup = () => {
    const {t} = useLanguage();
    const {isConfigPopupOpen, setIsConfigPopupOpen} = usePopup();
    const {focusedRow} = useConfig();

    // Fetch column data when popup is open
    const {data: columnData, isLoading: isColumnDataLoading} = useQuery(
        ['columnData', focusedRow?.COL_NAME],
        () => fetchColumnData(focusedRow.COL_NAME),
        {
            enabled: !!focusedRow?.COL_NAME && isConfigPopupOpen,
        }
    );

    if (!isConfigPopupOpen) return null;

    return (
        <PopupOverlay setIsPopupOpen={setIsConfigPopupOpen}>
            <PopupContent>
                <PopupHeader>
                    <Area>
                        <Area flex justifyContent="between">
                            <Span fontSize="4">
                                {t('components.record_detail_title')}
                            </Span>
                            <Button size="sm" variant="light" onClick={() => setIsConfigPopupOpen(false)}>
                                {t('components.close')}
                            </Button>
                        </Area>
                        <Area flex justifyContent="center">
                            <Span fontSize="5" fontWeight="lighter">{focusedRow.COL_NAME}</Span>
                        </Area>
                    </Area>
                </PopupHeader>
                <PopupBody>
                    {Array.isArray(focusedRow.RULES) && focusedRow.RULES.length > 0 ? (
                        <Area>
                            <ChartControl isDataLoading={isColumnDataLoading}/>
                        </Area>
                    ) : (
                        <Area flex justifyContent="center" marginTop="20%">
                            <Span variant="secondary">
                                {t('components.no_rules_to_apply')}
                            </Span>
                        </Area>
                    )}
                </PopupBody>
            </PopupContent>
        </PopupOverlay>
    );
};

export default ConfigPopup;
