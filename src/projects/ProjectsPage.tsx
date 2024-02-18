import { useEffect, useState } from "react";
import { Project } from "./Project";
import ProjectsList from "./ProjectsList";
import { projectAPI } from "./projectAPI";

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const saveProject = (project: Project) => {
    projectAPI
      .put(project)
      .then((updatedProject) => {
        let updatedProjects = projects.map((p: Project) => {
          return p.id === project.id ? new Project(updatedProject) : p;
        });
        setProjects(updatedProjects);
      })
      .catch((e) => {
        if (e instanceof Error) {
          setError(e.message);
        }
      });
  };

  const handleMoreClick = () => {
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    setLoading(true);
    projectAPI
      .get(currentPage, 6)
      .then((data) => {
        setProjects((projects) => [...projects, ...data]);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [currentPage]);

  return (
    <div className='w-full'>
      {!loading ? (
        <div>
          {projects.length > 0 ? (
            <>
              <ProjectsList onSave={saveProject} projects={projects} />
              <button
                className='border border-blue-600 bg-blue-600 px-4 py-2 text-white font-semibold mx-auto block mt-10 rounded-md'
                onClick={handleMoreClick}
              >
                More...
              </button>
            </>
          ) : (
            <h1>{error}</h1>
          )}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default ProjectsPage;
