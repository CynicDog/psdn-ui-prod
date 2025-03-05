import { useState, useEffect } from "react";
import { useAuth } from "../context/Auth";
import { useQuery } from "react-query";
import { getAllProjects } from "../data/APIs";
import LoadingSpinner from "../component/LoadingSpinner";
import Area from "../component/Area";
import ProjectTable from "../module/management/ProjectTable";
import ManagePaginationControl from "../module/management/ManagePaginationControl";
import Button from "../component/Button";
import { useLanguage } from "../context/Language";
import ProjectManagePopup from "../module/management/ProjectManagePopup";

const ProjectManagementView = () => {
    const { t } = useLanguage();
    const { auth } = useAuth();

    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);

    const [manageProjects, setManageProjects] = useState([]);
    const [selectedProjects, setSelectedProjects] = useState(new Set());

    const { data: projects, isLoading } = useQuery(
        ["projects", auth.token],
        () => getAllProjects(auth),
        { enabled: !!auth.token }
    );

    // Sync internal state with fetched data
    useEffect(() => {
        if (projects?.data) {
            setManageProjects(projects.data);
        }
    }, [projects]);

    if (isLoading) return <LoadingSpinner />;

    const handleApproveProjects = () => {
        setManageProjects((prevProjects) =>
            prevProjects.map((project) =>
                selectedProjects.has(project.ID) && project.STATUS === "PENDING"
                    ? { ...project, STATUS: "APPROVED", APPROVE_AT: new Date(Date.now()).toISOString().split("T")[0] }
                    : project
            )
        );

        // Clear selection after approval
        setSelectedProjects(new Set());
    };

    return (
        <>
            {manageProjects.length > 0 && (
                <Area rounded shadow="sm" fontSize="smaller">
                    <Area className="control-panel" bg="body" flex justifyContent="between" alignItems="center" borderBottom>
                        {/* Project Pagination Control */}
                        <ManagePaginationControl
                            totalItems={manageProjects.length}
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
                        projects={manageProjects}
                        rowsPerPage={rowsPerPage}
                        currentPage={currentPage}
                        selectedProjects={selectedProjects}
                        setSelectedProjects={setSelectedProjects}
                    />
                </Area>
            )}
            <ProjectManagePopup setManageProjects={setManageProjects}/>
        </>
    );
};

export default ProjectManagementView;
