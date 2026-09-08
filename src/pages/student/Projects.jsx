import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import ProjectCard from "../../components/ProjectCard";

function Projects() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const projects = [
    {
      title: "React Website Development",
      category: "Web Development",
      budget: "12,000",
      company: "TechNova",
      match: "96%",
    },
    {
      title: "Instagram Post Design",
      category: "Graphic Design",
      budget: "5,000",
      company: "Brandify",
      match: "90%",
    },
    {
      title: "Python Data Analysis",
      category: "Python",
      budget: "9,000",
      company: "DataWorks",
      match: "86%",
    },
    {
      title: "Mobile App UI Design",
      category: "UI/UX",
      budget: "8,000",
      company: "AppZone",
      match: "82%",
    },
  ];

  const filtered = projects.filter((project) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      project.title.toLowerCase().includes(searchText) ||
      project.category.toLowerCase().includes(searchText) ||
      project.company.toLowerCase().includes(searchText);

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
            {filtered.length} Project
            {filtered.length !== 1 ? "s" : ""} Found
          </h2>

          <p>
            Choose a project that matches your skills.
          </p>
        </div>

      </div>


      {/* ================= PROJECTS ================= */}
      <div className="project-grid">

        {filtered.length > 0 ? (
          filtered.map((project, index) => (
            <ProjectCard
              key={index}
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