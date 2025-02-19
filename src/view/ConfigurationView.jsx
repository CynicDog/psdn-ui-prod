import React from "react";
import Area from "../component/Area";
import {Col, Row} from "../component/Grid";
import LoadingSpinner from "../component/LoadingSpinner";
import ConfigTableHeader from "../module/configuration/ConfigTableHeader";
import ConfigTablePaginationControl from "../module/configuration/ConfigTablePaginationControl";
import ConfigTableColumn from "../module/configuration/ConfigTableColumn";
import ConfigPopup from "../module/configuration/ConfigPopup";
import ConfigTable from "../module/configuration/ConfigTable";
import ConfigActions from "../module/configuration/ConfigActions";
import {useConfig} from "../context/Config";
import {useBaseDB} from "../context/BaseDB";
import {useLanguage} from "../context/Language";
import BaseDBSelectControl from "../module/configuration/BaseDBSelectControl";

const ConfigurationView = () => {

    const {t} = useLanguage();
    const {currentBaseDB, isCurrentBaseDBLoading} = useBaseDB();
    const {paginatedRows} = useConfig();

    return (
        <>
            {!currentBaseDB ? (
                <Area textPosition="center" mt="4">
                    {t('messages.request_table_designation')}
                </Area>
            ) : (
                <Area rounded shadow="sm" fontSize="smaller">
                    <BaseDBSelectControl/>
                    <Area p="3">
                        {/* Control Panel */}
                        <Area className="control-panel" bg="body" borderBottom>
                            <Row p="2">
                                <Col width="7" responsive="lg" my="1">
                                    <ConfigTablePaginationControl />
                                </Col>
                                <Col width="5" responsive="lg" my="1">
                                    <Area flex justifyContent="end">
                                        <ConfigActions />
                                    </Area>
                                </Col>
                            </Row>

                        </Area>

                        {/* Configuration Data Table */}
                        {isCurrentBaseDBLoading || !paginatedRows ? (
                            <LoadingSpinner/>
                        ) : (
                            <ConfigTable>
                                <ConfigTableHeader>
                                    {/*<ConfigTableColumn name="APPT_YN" applyFilter width="7%"/>*/}
                                    <ConfigTableColumn name="COL_NAME" width="11%"/>
                                    <ConfigTableColumn name="COL_NAME_LGCL" width="11%"/>
                                    <ConfigTableColumn name="COL_TYPE" applyFilter width="9%"/>
                                    <ConfigTableColumn name="RULES" applyFilter width="25%"/>
                                    <ConfigTableColumn name="DESC" width="30%"/>
                                </ConfigTableHeader>
                            </ConfigTable>
                        )}
                    </Area>
                </Area>
            )}

            {/* Configuration Popup */}
            <ConfigPopup/>
        </>
    );
};

export default ConfigurationView;
