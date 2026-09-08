import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import ProjectCard from "../../components/ProjectCard";

function AIMatch() {

  const [matching, setMatching] = useState(false);
  const [show, setShow] = useState(false);

  const projects = [
    {
      title: "React Dashboard",
      category: "React.js",
      budget: "15,000",
      company: "StartupX",
      match: "98%"
    },
    {
      title: "Business Website",
      category: "Web Development",
      budget: "10,000",
      company: "TechNova",
      match: "94%"
    },
    {
      title: "E-commerce Website",
      category: "Web Development",
      budget: "12,000",
      company: "CreativeHub",
      match: "91%"
    },
    {
      title: "Portfolio UI Design",
      category: "UI/UX",
      budget: "8,000",
      company: "DesignPro",
      match: "87%"
    }
  ];


  const findMatch = () => {

    setMatching(true);
    setShow(false);

    setTimeout(() => {
      setMatching(false);
      setShow(true);
    }, 1500);

  };


  const clearMatches = () => {
    setShow(false);
  };


  return (
    <DashboardLayout>

      {/* AI HERO */}

      <div className="ai-hero">

        <div className="ai-icon">
          🤖
        </div>

        <h1>
          AI Skill Match
        </h1>

        <p>
          Our smart matching system finds projects
          that fit your skills.
        </p>


        <button
          className="primary-btn"
          onClick={findMatch}
          disabled={matching}
        >
          {matching
            ? "🤖 Analyzing Your Skills..."
            : "✨ Find My Matches"}
        </button>

      </div>


      {/* LOADING */}

      {matching && (

        <div className="empty-state">

          <div className="ai-icon">
            🔍
          </div>

          <h2>
            Finding the best projects...
          </h2>

          <p>
            AI is comparing your skills with available projects.
          </p>

        </div>

      )}


      {/* RESULTS */}

      {show && !matching && (

        <div>

          <div className="section-heading">

            <div>
              <h2>
                🎯 Top Matches
              </h2>

              <p>
                Projects recommended based on your skills.
              </p>
            </div>


            <button
              className="outline-btn"
              onClick={clearMatches}
            >
              ✕ Clear
            </button>

          </div>


          {/* MATCH SUMMARY */}

          <div className="dashboard-stats">

            <div>
              <span>🎯</span>
              <b>4</b>
              <small>Projects Matched</small>
            </div>

            <div>
              <span>🔥</span>
              <b>98%</b>
              <small>Best Match</small>
            </div>

            <div>
              <span>💼</span>
              <b>₹15K</b>
              <small>Highest Budget</small>
            </div>

            <div>
              <span>⚡</span>
              <b>92%</b>
              <small>Average Match</small>
            </div>

          </div>


          {/* PROJECTS */}

          <div className="project-grid">

            {projects.map((project, index) => (

              <ProjectCard
                key={index}
                title={project.title}
                category={project.category}
                budget={project.budget}
                company={project.company}
                match={project.match}
              />

            ))}

          </div>

        </div>

      )}


      {/* INITIAL STATE */}

      {!show && !matching && (

        <div className="empty-state">

          <div className="ai-icon">
            🎯
          </div>

          <h2>
            Ready to find your perfect project?
          </h2>

          <p>
            Click "Find My Matches" and we'll
            recommend projects based on your skills.
          </p>

        </div>

      )}

    </DashboardLayout>
  );
}

export default AIMatch;