import { useState } from "react";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

interface ProjectsListProps {
  projects: Project[];
  onSave: (project: Project) => void;
}

function ProjectsList({ projects, onSave }: ProjectsListProps) {
  const [projectBeingEdited, setProjectBeingEdited] = useState({});

  const handleEditClick = (project: Project) => {
    setProjectBeingEdited(project);
  };

  const cancelEditing = () => {
    setProjectBeingEdited({});
  };

  return (
    <div className='grid grid-cols-3 items-stretch gap-5 mx-20'>
      {projects.map((project) => (
        <div key={project.id} className='flex flex-col gap-10'>
          {project === projectBeingEdited ? (
            <ProjectForm
              onCancel={cancelEditing}
              onSave={onSave}
              project={project}
            />
          ) : (
            <ProjectCard project={project} onEdit={handleEditClick} />
          )}
        </div>
      ))}
    </div>
  );
}

export default ProjectsList;
