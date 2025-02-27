import {Col, Row} from "../../component/Grid";
import Span from "../../component/Span";
import DraggableArea from "../../component/DraggableArea";
import {useState} from "react";
import {useProject} from "../../context/Project";
import Icon from "../../component/Icon";
import InputField from "../../component/InputField";
import {useLanguage} from "../../context/Language";
import Tooltip from "../../component/Tooltip";
import {PROJECT_COLORS} from "../../context/util";
import Area from "../../component/Area";
import TextArea from "../../component/TextArea";

const ProjectCard = ({project, order, onSelect, currentProject}) => {
    const {t} = useLanguage();
    const {
        sourceProjectDraggable, setSourceProjectDraggable,
        targetProjectDraggable, setTargetProjectDraggable,
        handleMoveProject,
        setProjects
    } = useProject();
    const [isDragging, setIsDragging] = useState(false);
    const [isOver, setIsOver] = useState(false);
    // const [isEditing, setIsEditing] = useState(false);
    // const [editedName, setEditedName] = useState(project.NAME);
    // const [editedDescription, setEditedDescription] = useState(project.DESCRIPTION);

    const handleDragStart = (e) => {
        setSourceProjectDraggable(order);
        setIsDragging(true);
        e.dataTransfer.setData("text/plain", project.ID);
    };

    const handleDragOver = (e) => {
        e.preventDefault();

        const targetOrder = e.currentTarget.getAttribute("data-order");
        setTargetProjectDraggable(Number(targetOrder));

        setIsOver(true);
    };

    const handleDragLeave = () => {
        setIsOver(false);
    };

    const handleDrop = (e) => {
        setIsOver(false);
    };

    const handleDragEnd = (e) => {
        if (sourceProjectDraggable !== targetProjectDraggable && targetProjectDraggable !== null) {
            handleMoveProject(sourceProjectDraggable, targetProjectDraggable);
        }

        // Reset context after drop
        setIsDragging(false);
        setIsOver(false);
        setSourceProjectDraggable(null);
        setTargetProjectDraggable(null);
    };

    // const handleSave = () => {
    //     setProjects((prevProjects) => {
    //         const updatedProjects = prevProjects.data.map((p) =>
    //             p.ID === project.ID ? { ...p, NAME: editedName, DESCRIPTION: editedDescription } : p
    //         );
    //
    //         // Preserve the selected project after the update
    //         const updatedProject = updatedProjects.find((p) => p.ID === project.ID);
    //         onSelect(updatedProject);
    //
    //         return { ...prevProjects, data: updatedProjects };
    //     });
    //     setIsEditing(false);
    // };

    const getBadgeClass = (status) => {
        switch (status) {
            case "APPROVED":
                return "primary-filled";
            case "WRITING":
                return "warning";
            default:
                return "secondary-filled";
        }
    };

    return (
        <DraggableArea
            order={order}
            onClick={(e) => {
                e.stopPropagation();

                if (project.STATUS === "APPROVED") {
                    onSelect(project);
                }
            }}
            isDragging={isDragging}
            isOver={isOver}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            bg={currentProject === project ? "primary-subtle" : "body"}
            border rounded="2" shadow="sm" my="2"
        >
            <Row key={project.ID} rounded p="3" m="3">
                {/* Project name */}
                <Col width="2" responsive="lg" my="1">
                    {project.STATUS === "WRITING" ? (
                        <Area>
                            <Span fontWeight="lighter">
                                {t('components.project_name')}
                            </Span>
                            <InputField
                                id={`name-${project.ID}`}
                                // value={editedName}
                                // onChange={(e) => setEditedName(e.target.value)}
                            />
                        </Area>
                    ) : (
                        <Area flex justifyContent="start" alignItems="center">
                            <Span badge="secondary-filled" fontWeight="light">
                                {project.NAME}
                            </Span>
                        </Area>
                    )}
                </Col>

                {/* Project description */}
                <Col width="5" responsive="lg" my="1">
                    {project.STATUS === "WRITING" ? (
                        <Area>
                            <Span fontWeight="lighter">
                                {t('components.project_description')}
                            </Span>
                            <TextArea
                                id={`desc-${project.ID}`}
                                // value={editedDescription}
                                // onChange={(e) => setEditedDescription(e.target.value)}
                            />
                        </Area>
                    ) : (
                        <Span m="1">
                            {project.DESCRIPTION || t('components.project_no_description')}
                        </Span>
                    )}
                </Col>

                {/* Project's working tables */}
                <Col width="3" responsive="lg" my="1">
                    {project.STATUS === "WRITING" ? (
                        <Area>
                            <Span fontWeight="lighter">
                                {t('components.project_tables')}
                            </Span>
                        </Area>
                    ) : (
                        project.TABLES?.map((table) => (
                            <Span key={table.ID} badge="primary-filled" mx="1">
                                {table.NAME}
                            </Span>
                        ))
                    )}
                </Col>

                <Col width="2" responsive="lg" my="1" flex justifyContent="end">
                    <Area>
                        <Span
                            key={project.ID}
                            badge={getBadgeClass(project.STATUS)}
                            mx="1">
                            {project.STATUS}
                        </Span>
                        {project.STATUS === "WRITING" && (
                            <Span badge="danger">delete</Span>
                        )}
                    </Area>
                </Col>

                {/*/!* Edit button *!/*/}
                {/*<Col width="1" responsive="lg" flex justifyContent="end" my="1">*/}
                {/*    <Icon*/}
                {/*        name={isEditing ? "check-lg" : "pencil-fill"}*/}
                {/*        onClick={(e) => {*/}
                {/*            e.stopPropagation();*/}
                {/*            isEditing ? handleSave() : setIsEditing(true);*/}
                {/*        }}*/}
                {/*        variant="secondary"*/}
                {/*    />*/}
                {/*</Col>*/}

            </Row>
        </DraggableArea>
    );
};

export default ProjectCard;
