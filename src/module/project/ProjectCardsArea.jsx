import Area from "../../component/Area";
import Span from "../../component/Span";
import Icon from "../../component/Icon";

// TODO: replace to list
const ProjectCard = ({ project, isSelected, onClick, isAddCard = false }) => {
    return (
        <Area
            key={project?.ID || "add-card"}
            bg={isSelected ? "primary-subtle" : "light-subtle"}
            border="secondary"
            rounded="3"
            p="4"
            m="3"
            shadow
            width="150px"
            height="200px"
            cursor="pointer"
            flex
            alignItems={isAddCard ? "center" : ""}
            justifyContent="center"
            onClick={onClick}
        >
            <Span fontWeight={isAddCard ? "bold" : "normal"}>
                {isAddCard ? <Icon name="folder-plus" /> : project.NAME}
            </Span>
        </Area>
    );
};

const ProjectCardsArea = ({ projects, currentProject, onSelect }) => {
    return (
        <Area flex flexWrap="wrap" justifyContent="center" gap="3" mt="10">
            {projects?.data?.map((project) => (
                <ProjectCard
                    key={project.ID}
                    project={project}
                    isSelected={currentProject === project}
                    onClick={() => onSelect(project)}
                />
            ))}

            {/* Add Project Card */}
            <ProjectCard isAddCard onClick={() => console.log("Add Project Clicked")} />
        </Area>
    );
};

export default ProjectCardsArea;
