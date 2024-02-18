import { Project } from "./Project";
import img1 from "../assets/placeimg_500_300_arch1.jpg";
import img2 from "../assets/placeimg_500_300_arch2.jpg";
import img3 from "../assets/placeimg_500_300_arch3.jpg";
import img4 from "../assets/placeimg_500_300_arch4.jpg";
import img5 from "../assets/placeimg_500_300_arch5.jpg";
import img6 from "../assets/placeimg_500_300_arch6.jpg";
import img7 from "../assets/placeimg_500_300_arch7.jpg";
import img8 from "../assets/placeimg_500_300_arch8.jpg";
import img9 from "../assets/placeimg_500_300_arch9.jpg";
import img10 from "../assets/placeimg_500_300_arch10.jpg";
import img11 from "../assets/placeimg_500_300_arch11.jpg";
import img12 from "../assets/placeimg_500_300_arch12.jpg";
import { Link } from "react-router-dom";

interface ProjectCardProp {
  project: Project;
  onEdit: (project: Project) => void;
}

function ProjectCard({ project, onEdit }: ProjectCardProp) {
  function formatDescription(str: string): string {
    return str.substring(0, 60) + "...";
  }

  const imgOptions = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
  ];

  let randomImg = Math.floor(Math.random() * imgOptions.length);

  return (
    <div className='bg-gray-200 rounded-md overflow-hidden'>
      <div className='card'>
        <img src={imgOptions[randomImg]} alt={project.name} />
        <section className='section dark p-3'>
          <Link to={`/projects/` + project.id} className='my-3'>
            <strong>{project.name}</strong>
          </Link>
          <p>{formatDescription(project.description)}</p>
          <p>Budget : {project.budget.toLocaleString()}</p>
          <button
            className='border border-blue-700 px-3 py-1 rounded-md mt-5 bg-blue-600 text-white font-bold'
            onClick={() => onEdit(project)}
          >
            ✏️ Edit
          </button>
        </section>
      </div>
    </div>
  );
}

export default ProjectCard;
