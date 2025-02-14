import React from "react";
import Area from "../component/Area";
import {Col, Row} from "../component/Grid";
import LoadingSpinner from "../module/LoadingSpinner";
import ConfigTableHeader from "../module/configuration/ConfigTableHeader";
import ConfigTablePaginationControl from "../module/configuration/ConfigTablePaginationControl";
import ConfigTableColumn from "../module/configuration/ConfigTableColumn";
import ConfigPopup from "../module/configuration/ConfigPopup";
import ConfigTable from "../module/configuration/ConfigTable";
import ConfigActions from "../module/configuration/ConfigActions";
import {useConfig} from "../context/Config";
import {useBaseDB} from "../context/BaseDB";
import {useLanguage} from "../context/Language";

const ConfigurationView = () => {

    const {t} = useLanguage();
    const {BaseDB, isBaseDBLoading} = useBaseDB();
    const {paginatedRows} = useConfig();

    return (
        <>
            {!BaseDB ? (
                <Area textPosition="center" mt="4">
                    {t('messages.request_table_designation')}
                </Area>
            ) : (
                <Area style={{fontSize: "smaller"}}>
                    {/* Control Panel */}
                    <Area className="control-panel" bg="body">
                        <Row p="2">
                            <Col width="7" responsive="lg">
                                <ConfigTablePaginationControl/>
                            </Col>
                            <Col width="5" responsive="lg">
                                <Area flex justifyContent="end">
                                    Search Input
                                </Area>
                            </Col>
                        </Row>
                        <Area flex border rounded shadow="sm" gap="2" p="2">
                            <ConfigActions/>
                        </Area>
                    </Area>

                    {/* Configuration Data Table */}
                    {isBaseDBLoading || !paginatedRows ? (
                        <LoadingSpinner />
                    ) : (
                        <ConfigTable>
                            <ConfigTableHeader>
                                <ConfigTableColumn name="APPT_YN" applyFilter width="7%"/>
                                <ConfigTableColumn name="COL_NAME" width="11%"/>
                                <ConfigTableColumn name="COL_NAME_LGCL" width="11%"/>
                                <ConfigTableColumn name="COL_TYPE" applyFilter width="9%"/>
                                <ConfigTableColumn name="RULES" applyFilter width="25%"/>
                                <ConfigTableColumn name="DESC" width="30%"/>
                            </ConfigTableHeader>
                        </ConfigTable>
                    )}
                </Area>
            )}

            {/* Configuration Popup */}
            <ConfigPopup/>
        </>
    );
};

export default ConfigurationView;
