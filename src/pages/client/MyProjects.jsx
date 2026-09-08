import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

function MyProjects() {

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-commerce Website",
      category: "Web Development",
      budget: 20000,
      proposals: 6,
      status: "Hiring",
      skills: "React, JavaScript, HTML, CSS",
    },
    {
      id: 2,
      title: "Mobile App Design",
      category: "UI/UX Design",
      budget: 15000,
      proposals: 4,
      status: "In Progress",
      skills: "Figma, UI/UX, Prototyping",
    },
    {
      id: 3,
      title: "College Management System",
      category: "App Development",
      budget: 25000,
      proposals: 8,
      status: "Hiring",
      skills: "React, Node.js, MongoDB",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const deleteProject = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (confirmDelete) {
      setProjects(
        projects.filter((project) => project.id !== id)
      );
    }
  };

  const filteredProjects = projects.filter((project) => {

    const matchesSearch =
      project.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      project.category
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout type="client">

      {/* HEADER */}

      <div className="page-header">

        <div>
          <p className="welcome">
            CLIENT WORKSPACE 📁
          </p>

          <h1>
            My Projects
          </h1>

          <p>
            Manage all your posted projects.
          </p>
        </div>

        <Link
          to="/client/post-project"
          className="primary-btn"
        >
          ➕ Post New Project
        </Link>

      </div>


      {/* PROJECT STATS */}

      <div className="dashboard-stats">

        <div>
          <span>📁</span>
          <b>{projects.length}</b>
          <small>Total Projects</small>
        </div>

        <div>
          <span>🟢</span>
          <b>
            {
              projects.filter(
                (p) => p.status === "Hiring"
              ).length
            }
          </b>
          <small>Hiring</small>
        </div>

        <div>
          <span>🔵</span>
          <b>
            {
              projects.filter(
                (p) => p.status === "In Progress"
              ).length
            }
          </b>
          <small>In Progress</small>
        </div>

        <div>
          <span>📩</span>
          <b>
            {projects.reduce(
              (total, p) => total + p.proposals,
              0
            )}
          </b>
          <small>Total Proposals</small>
        </div>

      </div>


      {/* SEARCH + FILTER */}

      <div className="search-area">

        <input
          type="text"
          placeholder="🔎 Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >
          <option value="All">
            All Status
          </option>

          <option value="Hiring">
            Hiring
          </option>

          <option value="In Progress">
            In Progress
          </option>
        </select>

      </div>


      {/* RESULT */}

      <div className="section-heading">

        <div>
          <h2>
            Your Projects
          </h2>

          <p>
            Showing {filteredProjects.length} project
            {filteredProjects.length !== 1 ? "s" : ""}
          </p>
        </div>

      </div>


      {/* PROJECT LIST */}

      <div className="client-project-list">

        {filteredProjects.map((project) => (

          <div
            className="client-project"
            key={project.id}
          >

            {/* PROJECT INFO */}

            <div>

              <span className="category">
                {project.category}
              </span>

              <h3>
                {project.title}
              </h3>

              <p>
                💰 ₹{project.budget.toLocaleString("en-IN")}
                {" • "}
                📩 {project.proposals} proposals
              </p>

              <small>
                🛠 {project.skills}
              </small>

            </div>


            {/* STATUS */}

            <span
              className={`status ${
                project.status === "Hiring"
                  ? "active-status"
                  : ""
              }`}
            >
              {project.status === "Hiring"
                ? "🟢 Hiring"
                : "🔵 In Progress"}
            </span>


            {/* ACTIONS */}

            <div className="project-actions">

              <Link
                to={`/student/projects/view/${encodeURIComponent(
                  project.title
                )}`}
                className="small-btn"
              >
                👁️ View
              </Link>

              <Link
                to="/client/proposals"
                className="small-btn"
              >
                📩 Proposals
              </Link>

              <button
                className="small-btn"
                onClick={() =>
                  alert(
                    `Edit feature for "${project.title}" will open here.`
                  )
                }
              >
                ✏️ Edit
              </button>

              <button
                className="small-btn"
                onClick={() =>
                  deleteProject(project.id)
                }
              >
                🗑️ Delete
              </button>

            </div>

          </div>

        ))}

      </div>


      {/* EMPTY SEARCH RESULT */}

      {filteredProjects.length === 0 && (

        <div className="empty-state">

          <div className="big-icon">
            🔎
          </div>

          <h2>
            No Projects Found
          </h2>

          <p>
            Try changing your search or status filter.
          </p>

          <button
            className="outline-btn"
            onClick={() => {
              setSearch("");
              setStatusFilter("All");
            }}
          >
            🔄 Clear Filters
          </button>

        </div>

      )}


      {/* NO PROJECTS */}

      {projects.length === 0 && (

        <div className="empty-state">

          <div className="big-icon">
            📁
          </div>

          <h2>
            No Projects Yet
          </h2>

          <p>
            Post your first project and start receiving
            proposals from talented students.
          </p>

          <Link
            to="/client/post-project"
            className="primary-btn"
          >
            ➕ Post Your First Project
          </Link>

        </div>

      )}

    </DashboardLayout>
  );
}

export default MyProjects;