import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

function Portfolio() {

  const [projects, setProjects] = useState([
    "E-commerce Website",
    "College Management System",
    "Portfolio Website"
  ]);

  const addProject = () => {

    const name = prompt("Enter project name");

    if (name) {
      setProjects([...projects, name]);
    }
  };

  return (
    <DashboardLayout>

      <div className="page-header">

        <div>
          <h1>My Portfolio 📁</h1>
          <p>Showcase your best work to clients.</p>
        </div>

        <button
          className="primary-btn"
          onClick={addProject}
        >
          + Add Project
        </button>

      </div>

      <div className="portfolio-grid">

        {projects.map((project, index) => (

          <div className="portfolio-card" key={index}>

            <div className="portfolio-image">
              💻
            </div>

            <div>
              <h3>{project}</h3>
              <p>Web Development</p>
            </div>

            <button className="small-btn">
              View Project
            </button>

          </div>

        ))}

      </div>

    </DashboardLayout>
  );
}

export default Portfolio;