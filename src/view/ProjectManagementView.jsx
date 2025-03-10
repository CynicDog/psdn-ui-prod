import {useEffect, useState} from "react";
import {useAuth} from "../context/Auth";
import {useQuery} from "react-query";
import {getAllProjects, saveProjects} from "../data/APIs";
import LoadingSpinner from "../component/LoadingSpinner";
import Area from "../component/Area";
import ProjectTable from "../module/management/ProjectTable";
import ManagePaginationControl from "../module/management/ManagePaginationControl";
import Button from "../component/Button";
import {useLanguage} from "../context/Language";
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
        if (projects?.item) {
            setManageProjects(projects.item);
        }
    }, [projects]);

    if (isLoading) return <LoadingSpinner />;

    const handleApproveProjects = async () => {
        const projectsToApprove = manageProjects
            .filter((project) => selectedProjects.has(project.id) && project.status === "PENDING")
            .map((project) => ({
                ...project,
                status: "APPROVED",
                approveTimestamp: new Date().toISOString()
            }));

        if (projectsToApprove.length > 0) {
            await saveProjects(auth, { item: projectsToApprove });
        }

        setManageProjects((prevProjects) =>
            prevProjects.map((project) =>
                selectedProjects.has(project.id) && project.status === "PENDING"
                    ? { ...project, status: "APPROVED", approveTimestamp: new Date().toISOString() }
                    : project
            )
        );
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
