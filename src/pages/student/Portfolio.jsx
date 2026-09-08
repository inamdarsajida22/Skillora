import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

function Portfolio() {

  const [projects, setProjects] = useState([
    "E-commerce Website",
    "College Management System",
    "Portfolio Website"
  ]);

  const addProject = () => {
    const name = prompt("Enter project name");

    if (name && name.trim()) {
      setProjects([...projects, name.trim()]);
    }
  };

  const deleteProject = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (confirmDelete) {
      setProjects(
        projects.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <DashboardLayout>

      <div className="page-header">

        <div>
          <h1>My Portfolio 📁</h1>
          <p>
            Showcase your best work to clients.
          </p>
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

          <div
            className="portfolio-card"
            key={index}
          >

            {/* Project Image */}
            <div className="portfolio-image">
              💻
            </div>


            {/* Project Information */}
            <div>
              <h3>{project}</h3>

              <p>
                Web Development
              </p>
            </div>


            {/* Buttons */}
            <div className="project-actions">

              <Link
                to={`/student/projects/view/${encodeURIComponent(project)}`}
                className="small-btn"
              >
                👁 View Project
              </Link>

              <button
                className="small-btn"
                onClick={() => deleteProject(index)}
              >
                🗑 Delete
              </button>

            </div>

          </div>

        ))}

      </div>


      {/* Empty Portfolio */}
      {projects.length === 0 && (
        <div className="empty-state">

          <h2>📁 Your portfolio is empty</h2>

          <p>
            Add your first project to showcase your skills.
          </p>

          <button
            className="primary-btn"
            onClick={addProject}
          >
            + Add Your First Project
          </button>

        </div>
      )}

    </DashboardLayout>
  );
}

export default Portfolio;