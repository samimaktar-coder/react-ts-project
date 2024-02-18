import { useState } from "react";
import { Project } from "./Project";

interface ProjectFormProps {
  project: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

function ProjectForm({
  onCancel,
  onSave,
  project: initialProject,
}: ProjectFormProps) {
  const [project, setProject] = useState(initialProject);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    budget: "",
  });

  const validate = (project: Project) => {
    let errors: any = { name: "", description: "", budget: "" };
    if (project.name.length === 0) {
      errors.name = "Name is required";
    }
    if (project.name.length > 0 && project.name.length < 3) {
      errors.name = "Name needs to be at least 3 characters.";
    }
    if (project.description.length === 0) {
      errors.description = "Description is required.";
    }
    if (project.budget === 0) {
      errors.budget = "Budget must be more than $0.";
    }
    return errors;
  };

  const isValid = () => {
    return (
      errors.name === "" && errors.description === "" && errors.budget === ""
    );
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!isValid()) return;
    onSave(project);
  };

  const handleChange = (event: any) => {
    const { type, name, value, checked } = event.target;
    // if input type is checkbox use checked
    // otherwise it's type is text, number etc. so use value
    let updatedValue = type === "checkbox" ? checked : value;

    //if input type is number convert the updatedValue string to a number
    if (type === "number") {
      updatedValue = Number(updatedValue);
    }
    const change = {
      [name]: updatedValue,
    };

    let updatedProject: Project;

    setProject((p) => {
      updatedProject = new Project({ ...p, ...change });
      return updatedProject;
    });

    setErrors(() => validate(updatedProject));
  };

  return (
    <form
      className='flex flex-col bg-gray-200 p-5 rounded-md'
      onSubmit={handleSubmit}
    >
      <div className='flex flex-col mb-3'>
        <label htmlFor='' className='mb-1 font-semibold'>
          Project Name:
        </label>
        <input
          type='text'
          className='h-9 rounded-md outline-none px-3'
          name='name'
          value={project.name}
          onChange={handleChange}
        />
        <p className='text-sm text-red-600'>{errors.name}</p>
      </div>
      <div className='flex flex-col mb-3'>
        <label htmlFor='' className='mb-1 font-semibold'>
          Project Description:
        </label>
        <textarea
          className='h-16 rounded-md resize-none outline-none px-3 py-2'
          name='description'
          value={project.description}
          onChange={handleChange}
        ></textarea>
        <p className='text-sm text-red-600'>{errors.description}</p>
      </div>
      <div className='flex flex-col mb-3'>
        <label htmlFor='' className='mb-1 font-semibold'>
          Project Budget:
        </label>
        <input
          type='number'
          className='h-9 rounded-md outline-none px-3'
          name='budget'
          value={project.budget}
          onChange={handleChange}
        />
        <p className='text-sm text-red-600'>{errors.budget}</p>
      </div>
      <div className='flex items-center gap-x-3 mb-3'>
        <label htmlFor='' className='mb-1 font-semibold'>
          Active:
        </label>
        <input
          type='checkbox'
          className='rounded-md  accent-green-600 outline-none px-3 cursor-pointer'
          name='isActive'
          checked={project.isActive}
          onChange={handleChange}
        />
      </div>
      <div className='flex gap-x-5'>
        <button
          type='submit'
          className='px-4 py-1 rounded-md bg-blue-600 text-white font-semibold'
        >
          Save
        </button>
        <button
          className='px-4 py-2 rounded-md bg-red-600 text-white font-semibold'
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;
