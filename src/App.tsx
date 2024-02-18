import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import ProjectsPage from "./projects/ProjectsPage";
import HomePage from "./home/HomePage";
import ProjectDetails from "./projects/ProjectDetails";

function App() {
  return (
    <div>
      <BrowserRouter>
        <nav className='mb-10 h-16 bg-black text-white flex items-center justify-between px-10'>
          <Link to='/' className='text-3xl font-bold'>
            Logo
          </Link>
          <div className='flex gap-x-4'>
            <Link to='/'>Home</Link>
            <Link to='/projects'>Projects</Link>
          </div>
        </nav>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/projects' element={<ProjectsPage />} />
          <Route path='/projects/:id' element={<ProjectDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
