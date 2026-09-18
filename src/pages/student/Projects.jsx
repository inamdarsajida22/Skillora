import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import ProjectCard from "../../components/ProjectCard";

function Projects() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load projects from backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/projects/")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to load projects");
        }

        const data = await response.json();

        // Convert backend data to existing ProjectCard format
        const formattedProjects = (data.projects || []).map((project) => {
          let projectCategory = "Web Development";

          const skills = (project.skills || "").toLowerCase();

          if (
            skills.includes("python") ||
            skills.includes("data")
          ) {
            projectCategory = "Python";
          } else if (
            skills.includes("design") ||
            skills.includes("graphic")
          ) {
            projectCategory = "Graphic Design";
          } else if (
            skills.includes("ui") ||
            skills.includes("ux")
          ) {
            projectCategory = "UI/UX";
          } else if (
            skills.includes("react") ||
            skills.includes("javascript") ||
            skills.includes("html") ||
            skills.includes("css")
          ) {
            projectCategory = "Web Development";
          }

          return {
            id: project.id,
            title: project.title,
            description: project.description,
            category: projectCategory,
            budget: project.budget || "Negotiable",
            company: project.client_id
              ? `Client #${project.client_id}`
              : "Skillora Client",
            match: "90%",
            skills: project.skills || "",
            status: project.status,
          };
        });

        setProjects(formattedProjects);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("❌ Unable to connect to backend.");
        setLoading(false);
      });
  }, []);

  const filtered = projects.filter((project) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      project.title.toLowerCase().includes(searchText) ||
      project.category.toLowerCase().includes(searchText) ||
      project.company.toLowerCase().includes(searchText) ||
      project.skills.toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All" ||
      project.category === category;

    return matchesSearch && matchesCategory;
  });

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
  };

  return (
    <DashboardLayout>

      {/* ================= HEADER ================= */}
      <div className="page-header">
        <div>
          <p className="welcome">OPPORTUNITIES</p>

          <h1>Find Projects 🔎</h1>

          <p>
            Discover projects that match your skills.
          </p>
        </div>
      </div>


      {/* ================= SEARCH & FILTER ================= */}
      <div className="search-area">

        <input
          type="text"
          placeholder="🔎 Search projects, skills or companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>

          <option value="Web Development">
            Web Development
          </option>

          <option value="Graphic Design">
            Graphic Design
          </option>

          <option value="Python">
            Python
          </option>

          <option value="UI/UX">
            UI/UX
          </option>
        </select>

        {(search || category !== "All") && (
          <button
            className="small-btn"
            onClick={clearFilters}
          >
            ✕ Clear
          </button>
        )}

      </div>


      {/* ================= RESULT COUNT ================= */}
      <div className="section-heading">

        <div>
          <h2>
            {loading
              ? "Loading Projects..."
              : `${filtered.length} Project${
                  filtered.length !== 1 ? "s" : ""
                } Found`}
          </h2>

          <p>
            Choose a project that matches your skills.
          </p>
        </div>

      </div>


      {/* ================= ERROR ================= */}
      {error && (
        <div className="error">
          {error}
        </div>
      )}


      {/* ================= PROJECTS ================= */}
      <div className="project-grid">

        {loading ? (
          <div className="empty-state">
            <div className="big-icon">⏳</div>
            <h2>Loading Projects...</h2>
            <p>Please wait while we fetch projects.</p>
          </div>
        ) : filtered.length > 0 ? (
          filtered.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
            />
          ))
        ) : (
          <div className="empty-state">

            <div className="big-icon">
              🔍
            </div>

            <h2>No Projects Found</h2>

            <p>
              Try another search or category.
            </p>

            <button
              className="primary-btn"
              onClick={clearFilters}
            >
              🔄 Show All Projects
            </button>

          </div>
        )}

      </div>

    </DashboardLayout>
  );
}

export default Projects;