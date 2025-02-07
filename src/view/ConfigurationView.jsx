import React from "react";
import Area from "../component/Area";
import { Col, Row } from "../component/Grid";
import Table from "../component/Table";
import ConfigTableHeader from "../module/ConfigTableHeader";
import PaginationControl from "../module/PaginationControl";
import ConfigTableColumn from "../module/ConfigTableColumn";
import ConfigPopup from "../layout/ConfigPopup";

const ConfigurationView = () => {

    return (
        <>
            <Area style={{ fontSize: "smaller" }}>
                {/* Control Panel */}
                <Area className="control-panel" bg="body">
                    <Row p="2">
                        <Col width="5" responsive="lg">
                            <PaginationControl />
                        </Col>
                        <Col width="7" responsive="lg">
                            <Area flex justifyContent="end">
                                Search Input
                            </Area>
                        </Col>
                    </Row>
                </Area>

                {/* Data Table */}
                <Table>
                    <ConfigTableHeader>
                        <ConfigTableColumn name="APPT_YN" applyFilter width="8%" />
                        <ConfigTableColumn name="COL_NAME" width="15%" />
                        <ConfigTableColumn name="COL_NAME_LGCL" width="15%" />
                        <ConfigTableColumn name="COL_TYPE" applyFilter />
                        <ConfigTableColumn name="RULES" applyFilter width="20%" />
                        <ConfigTableColumn name="DESC" width="30%" />
                    </ConfigTableHeader>
                </Table>
            </Area>

            {/* Configuration Popup */}
            <ConfigPopup />
        </>
    );
};

export default ConfigurationView;
