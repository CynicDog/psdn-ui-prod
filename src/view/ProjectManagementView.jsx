import { useState, useEffect } from "react";
import { useAuth } from "../context/Auth";
import { useQuery } from "react-query";
import { getAllProjects } from "../data/APIs";
import LoadingSpinner from "../component/LoadingSpinner";
import Area from "../component/Area";
import ProjectTable from "../module/management/ProjectTable";
import ManageItemsPaginationControl from "../module/management/ManageItemsPaginationControl";
import Button from "../component/Button";
import { useLanguage } from "../context/Language";

const ProjectManagementView = () => {
    const { t } = useLanguage();
    const { auth } = useAuth();

    const [internalProjects, setInternalProjects] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProjects, setSelectedProjects] = useState(new Set());

    const { data: projects, isLoading } = useQuery(
        ["projects", auth.token],
        () => getAllProjects(auth),
        { enabled: !!auth.token }
    );

    // Sync internal state with fetched data
    useEffect(() => {
        if (projects?.data) {
            setInternalProjects(projects.data);
        }
    }, [projects]);

    if (isLoading) return <LoadingSpinner />;

    const handleApproveProjects = () => {
        setInternalProjects((prevProjects) =>
            prevProjects.map((project) =>
                selectedProjects.has(project.ID) && project.STATUS === "PENDING"
                    ? { ...project, STATUS: "APPROVED", APPROVE_AT: new Date().toISOString() }
                    : project
            )
        );

        // Clear selection after approval
        setSelectedProjects(new Set());
    };

    return (
        <>
            {internalProjects.length > 0 && (
                <Area rounded shadow="sm" fontSize="smaller">
                    <Area className="control-panel" bg="body" flex justifyContent="between" alignItems="center" borderBottom>
                        {/* Project Pagination Control */}
                        <ManageItemsPaginationControl
                            totalItems={internalProjects.length}
                            rowsPerPage={rowsPerPage}
                            setRowsPerPage={setRowsPerPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                        <Area>
                            <Button size="sm" variant="secondary" onClick={handleApproveProjects}>
                                {t("components.approve_project")}
                            </Button>
                        </Area>
                    </Area>

                    {/* Project Table with pagination props */}
                    <ProjectTable
                        projects={internalProjects}
                        rowsPerPage={rowsPerPage}
                        currentPage={currentPage}
                        selectedProjects={selectedProjects}
                        setSelectedProjects={setSelectedProjects}
                    />
                </Area>
            )}
        </>
    );
};

export default ProjectManagementView;
