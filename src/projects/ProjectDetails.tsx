import { useEffect, useState } from "react";
import { Project } from "./Project";
import img10 from "../assets/placeimg_500_300_arch10.jpg";
import { Link, useParams } from "react-router-dom";
import { projectAPI } from "./projectAPI";

function ProjectDetails() {
  const [project, setProject] = useState<Project | null>(null);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    projectAPI.find(Number(id)).then((data) => setProject(data));
  }, []);

  return (
    project && (
      <>
        <Link to='/projects'>Back to projects</Link>
        <div className='bg-gray-200 rounded-md overflow-hidden w-1/3 mx-auto'>
          <div className='card'>
            <img src={img10} alt={project.name} />
            <section className='section dark p-3'>
              <h5 className='my-3'>
                <strong>{project.name}</strong>
              </h5>
              <p>{project.description}</p>
              <p>Budget : {project.budget.toLocaleString()}</p>
              <mark className='active'>
                {project.isActive ? "active" : "inactive"}
              </mark>
            </section>
          </div>
        </div>
      </>
    )
  );
}

export default ProjectDetails;
