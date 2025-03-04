import { useState } from "react";
import { useAuth } from "../context/Auth";
import { useQuery } from "react-query";
import { getAllProjects } from "../data/APIs";
import LoadingSpinner from "../component/LoadingSpinner";
import Area from "../component/Area";
import ProjectTable from "../module/management/ProjectTable";
import ManageItemsPaginationControl from "../module/management/ManageItemsPaginationControl";
import Button from "../component/Button";
import {useLanguage} from "../context/Language";


const ProjectManagementView = () => {

    const { t } = useLanguage();
    const { auth } = useAuth();

    const { data: projects, isLoading } = useQuery(
        ["projects", auth.token],
        () => getAllProjects(auth),
        { enabled: !!auth.token }
    );

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    if (isLoading) return <LoadingSpinner />;

    return (
        <>
            {projects && (
                <Area rounded shadow="sm" fontSize="smaller">
                    <Area className="control-panel" bg="body" flex justifyContent="between" alignItems="center" borderBottom>
                        {/* Project Pagination Control */}
                        <ManageItemsPaginationControl
                            totalItems={projects.data.length}
                            rowsPerPage={rowsPerPage}
                            setRowsPerPage={setRowsPerPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                        <Area>
                            <Button size="sm" variant="secondary" onClick={() => {

                            }}>
                                {t('components.approve_project')}
                            </Button>
                        </Area>
                    </Area>

                    {/* Project Table with pagination props */}
                    <ProjectTable
                        projects={projects.data}
                        rowsPerPage={rowsPerPage}
                        currentPage={currentPage}
                    />
                </Area>
            )}
        </>
    );
};

export default ProjectManagementView;
