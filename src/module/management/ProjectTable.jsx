import { useState } from "react";
import Table from "../../component/Table";
import TableBody from "../../component/TableBody";
import TableHeader from "../../component/TableHeader";
import TableHeaderCell from "../../component/TableHeaderCell";
import TableRow from "../../component/TableRow";
import TableRowCell from "../../component/TableRowCell";
import Area from "../../component/Area";
import CheckBox from "../../component/CheckBox";
import Span from "../../component/Span";
import { useLanguage } from "../../context/Language";
import { getProjectStatusBadgeClass } from "../../context/util";
import Icon from "../../component/Icon";
import {usePopup} from "../../context/Popup";
import {useProject} from "../../context/Project";

const ProjectTable = ({ projects, rowsPerPage, currentPage, selectedProjects, setSelectedProjects }) => {

    const { t } = useLanguage();
    const { setIsProjectManagePopupOpen } = usePopup();
    const { setLookedUpProject } = useProject();

    const paginatedProjects = projects.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
    const allSelected = paginatedProjects.every(project => selectedProjects.has(project.ID));

    const handleSelectAll = () => {
        setSelectedProjects(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (allSelected) {
                paginatedProjects.forEach(project => newSelected.delete(project.ID));
            } else {
                paginatedProjects.forEach(project => newSelected.add(project.ID));
            }
            return newSelected;
        });
    };

    const handleProjectSelect = (projectId) => {
        setSelectedProjects(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(projectId)) {
                newSelected.delete(projectId);
            } else {
                newSelected.add(projectId);
            }
            return newSelected;
        });
    };

    {/*TODO: filtering / sorting */}
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell width="5%">
                        <Area flex justifyContent="center" mb="3">
                            {t('components.grid_row_control_check')}
                        </Area>
                        <Area flex justifyContent="center" my="1">
                            <CheckBox checked={allSelected} onChange={handleSelectAll} />
                        </Area>
                    </TableHeaderCell>
                    <TableHeaderCell>{t('components.manage_project_name')}</TableHeaderCell>
                    <TableHeaderCell>{t('components.manage_project_username')}</TableHeaderCell>
                    <TableHeaderCell>{t('components.manage_project_tables')}</TableHeaderCell>
                    <TableHeaderCell>{t('components.manage_project_status')}</TableHeaderCell>
                    <TableHeaderCell>{t('components.project_create_at')}</TableHeaderCell>
                    <TableHeaderCell>{t('components.project_approve_at')}</TableHeaderCell>
                    <TableHeaderCell>{t('components.project_start_at')}</TableHeaderCell>
                    <TableHeaderCell>{t('components.project_finish_at')}</TableHeaderCell>
                    <TableHeaderCell>{/* Placeholder cell for popup icon */}</TableHeaderCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                {paginatedProjects.map(project => (
                    <TableRow key={project.ID} selected={selectedProjects.has(project.ID)} onClick={() => handleProjectSelect(project.ID)}>
                        <TableRowCell width="5%">
                            <Area flex justifyContent="center">
                                <CheckBox checked={selectedProjects.has(project.ID)} onChange={(e) => {
                                    e.stopPropagation();
                                }} />
                            </Area>
                        </TableRowCell>
                        <TableRowCell>{project.NAME}</TableRowCell>
                        <TableRowCell>{project.USERNAME}</TableRowCell>
                        <TableRowCell>
                            {project.TABLES.map((table, index) => (
                                <Span key={index} badge="primary-filled" mx="1">
                                    {table.NAME}
                                </Span>
                            ))}
                        </TableRowCell>
                        <TableRowCell>
                            <Span badge={getProjectStatusBadgeClass(project.STATUS)}>
                                {project.STATUS}
                            </Span>
                        </TableRowCell>
                        <TableRowCell>
                            {project.CREATE_AT ? (
                                <Span>
                                    {project.CREATE_AT}
                                </Span>
                            ) : (
                                <Span variant="secondary">
                                    null
                                </Span>
                            )}
                        </TableRowCell>
                        <TableRowCell>
                            {project.APPROVE_AT ? (
                                <Span>
                                    {project.APPROVE_AT}
                                </Span>
                            ) : (
                                <Span variant="secondary">
                                    null
                                </Span>
                            )}
                        </TableRowCell>
                        <TableRowCell>
                            {project.START_AT ? (
                                <Span>
                                    {project.START_AT}
                                </Span>
                            ) : (
                                <Span variant="secondary">
                                    null
                                </Span>
                            )}
                        </TableRowCell>
                        <TableRowCell>
                            {project.FINISH_AT ? (
                                <Span>
                                    {project.FINISH_AT}
                                </Span>
                            ) : (
                                <Span variant="secondary">
                                    null
                                </Span>
                            )}
                        </TableRowCell>
                        <TableRowCell>
                            <Icon name="box-arrow-up-right" onClick={(e) => {
                                e.stopPropagation();
                                setLookedUpProject(project);
                                setIsProjectManagePopupOpen(true);
                            }} />
                        </TableRowCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ProjectTable;
