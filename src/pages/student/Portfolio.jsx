import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

function Portfolio() {
  const [projects, setProjects] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");

  const user = JSON.parse(localStorage.getItem("skilloraUser"));
  const userId = user?.id;

  // Load portfolio
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    fetch(`http://127.0.0.1:8000/api/portfolio/${userId}`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to load portfolio");
        }

        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setProjects(data.projects);
        }
      })
      .catch((error) => {
        console.error("Portfolio Load Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  // Add project
  const addProject = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter project title.");
      return;
    }

    if (!userId) {
      alert("Please login first.");
      return;
    }

    setSaving(true);

    try {
      const url =
        `http://127.0.0.1:8000/api/portfolio/` +
        `?user_id=${userId}` +
        `&title=${encodeURIComponent(title)}` +
        `&description=${encodeURIComponent(description)}` +
        `&skills=${encodeURIComponent(skills)}` +
        `&github_link=${encodeURIComponent(githubLink)}` +
        `&live_link=${encodeURIComponent(liveLink)}`;

      const response = await fetch(url, {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to add project");
      }

      if (data.success) {
        setProjects((previousProjects) => [
          data.project,
          ...previousProjects,
        ]);

        setTitle("");
        setDescription("");
        setSkills("");
        setGithubLink("");
        setLiveLink("");

        setShowForm(false);

        alert("Project added successfully! ✅");
      }
    } catch (error) {
      console.error("Portfolio Add Error:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  // Delete project
  const deleteProject = async (projectId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/portfolio/${projectId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to delete project");
      }

      if (data.success) {
        setProjects((previousProjects) =>
          previousProjects.filter(
            (project) => project.id !== projectId
          )
        );

        alert("Project deleted successfully! 🗑️");
      }
    } catch (error) {
      console.error("Portfolio Delete Error:", error);
      alert(error.message);
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
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "✖ Close" : "+ Add Project"}
        </button>
      </div>

      {/* ADD PROJECT FORM */}

      {showForm && (
        <div
          className="profile-card"
          style={{ marginBottom: "25px" }}
        >
          <h2>➕ Add Portfolio Project</h2>

          <form onSubmit={addProject}>
            <input
              type="text"
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />

            <textarea
              placeholder="Project Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                resize: "vertical",
              }}
            />

            <input
              type="text"
              placeholder="Skills (Example: React, JavaScript, CSS)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />

            <input
              type="url"
              placeholder="GitHub Link (optional)"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />

            <input
              type="url"
              placeholder="Live Project Link (optional)"
              value={liveLink}
              onChange={(e) => setLiveLink(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />

            <button
              type="submit"
              className="primary-btn"
              disabled={saving}
            >
              {saving ? "Saving..." : "💾 Save Project"}
            </button>
          </form>
        </div>
      )}

      {/* LOADING */}

      {loading && (
        <div className="empty-state">
          <h2>Loading Portfolio...</h2>
        </div>
      )}

      {/* PORTFOLIO PROJECTS */}

      {!loading && projects.length > 0 && (
        <div className="portfolio-grid">
          {projects.map((project) => (
            <div
              className="portfolio-card"
              key={project.id}
            >
              <div className="portfolio-image">
                💻
              </div>

              <div>
                <h3>{project.title}</h3>

                <p>
                  {project.skills || "Web Development"}
                </p>

                {project.description && (
                  <small>
                    {project.description}
                  </small>
                )}
              </div>

              <div className="project-actions">
                <Link
                  to={`/student/projects/view/${encodeURIComponent(
                    project.title
                  )}`}
                  className="small-btn"
                >
                  👁 View Project
                </Link>

                {project.github_link && (
                  <a
                    href={project.github_link}
                    target="_blank"
                    rel="noreferrer"
                    className="small-btn"
                  >
                    💻 GitHub
                  </a>
                )}

                {project.live_link && (
                  <a
                    href={project.live_link}
                    target="_blank"
                    rel="noreferrer"
                    className="small-btn"
                  >
                    🌐 Live
                  </a>
                )}

                <button
                  className="small-btn"
                  onClick={() => deleteProject(project.id)}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EMPTY PORTFOLIO */}

      {!loading && projects.length === 0 && !showForm && (
        <div className="empty-state">
          <h2>📁 Your portfolio is empty</h2>

          <p>
            Add your first project to showcase your skills.
          </p>

          <button
            className="primary-btn"
            onClick={() => setShowForm(true)}
          >
            + Add Your First Project
          </button>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Portfolio;