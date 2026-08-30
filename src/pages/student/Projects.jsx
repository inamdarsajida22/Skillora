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
      match: "96%"
    },
    {
      title: "Instagram Post Design",
      category: "Graphic Design",
      budget: "5,000",
      company: "Brandify",
      match: "90%"
    },
    {
      title: "Python Data Analysis",
      category: "Python",
      budget: "9,000",
      company: "DataWorks",
      match: "86%"
    },
    {
      title: "Mobile App UI Design",
      category: "UI/UX",
      budget: "8,000",
      company: "AppZone",
      match: "82%"
    }
  ];

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || p.category === category)
  );

  return (
    <DashboardLayout>

      <div className="page-header">
        <div>
          <h1>Find Projects 🔎</h1>
          <p>Discover projects that match your skills.</p>
        </div>
      </div>

      <div className="search-area">

        <input
          placeholder="🔎 Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Web Development</option>
          <option>Graphic Design</option>
          <option>Python</option>
          <option>UI/UX</option>
        </select>

      </div>

      <div className="project-grid">

        {filtered.map((project, index) => (
          <ProjectCard
            key={index}
            {...project}
          />
        ))}

      </div>

    </DashboardLayout>
  );
}

export default Projects;