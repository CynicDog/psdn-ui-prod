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
import ConfigTableTabArea from "../module/configuration/ConfigTableTabArea";
import ConfigTableSettingPopup from "../module/configuration/ConfigTableSettingPopup";
import {useConfig} from "../context/Config";
import {useBaseDB} from "../context/BaseDB";
import ConfigTableEntry from "../module/configuration/ConfigTableEntry";

const ConfigurationView = () => {

    const {currentBaseDB, isCurrentBaseDBLoading} = useBaseDB();
    const {paginatedRows} = useConfig();

    return (
        <>
            {!currentBaseDB ? (
                <ConfigTableEntry />
            ) : (
                <Area rounded shadow="sm" fontSize="smaller">
                    <ConfigTableTabArea/>
                    <Area p="3">
                        {/* Control Panel */}
                        <Area className="control-panel" bg="body" borderBottom>
                            <Row p="2">
                                <Col width="7" responsive="lg" my="1">
                                    <ConfigTablePaginationControl/>
                                </Col>
                                <Col width="5" responsive="lg" my="1">
                                    <Area flex justifyContent="end">
                                        <ConfigActions/>
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
                                    <ConfigTableColumn name="COL_NAME_LGCL" width="15%"/>
                                    <ConfigTableColumn name="COL_TYPE" applyFilter width="9%"/>
                                    <ConfigTableColumn name="RULES" applyFilter width="25%"/>
                                    <ConfigTableColumn name="DESC"/>
                                </ConfigTableHeader>
                            </ConfigTable>
                        )}
                    </Area>
                </Area>
            )}

            {/* Configuration Popup */}
            <ConfigPopup/>

            {/* Project Table Setting Popup */}
            <ConfigTableSettingPopup/>
        </>
    );
};

export default ConfigurationView;
