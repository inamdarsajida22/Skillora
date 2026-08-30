import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import ProjectCard from "../../components/ProjectCard";

function AIMatch() {

  const [matching, setMatching] = useState(false);
  const [show, setShow] = useState(false);

  const findMatch = () => {

    setMatching(true);

    setTimeout(() => {
      setMatching(false);
      setShow(true);
    }, 1000);

  };

  return (
    <DashboardLayout>

      <div className="ai-hero">

        <div className="ai-icon">🤖</div>

        <h1>AI Skill Match</h1>

        <p>
          Our smart matching system finds projects
          that fit your skills.
        </p>

        <button
          className="primary-btn"
          onClick={findMatch}
        >
          {matching ? "Finding Matches..." : "Find My Matches ✨"}
        </button>

      </div>

      {show && (

        <div>

          <div className="section-heading">
            <div>
              <h2>Top Matches</h2>
              <p>Based on your profile</p>
            </div>
          </div>

          <div className="project-grid">

            <ProjectCard
              title="React Dashboard"
              category="React.js"
              budget="15,000"
              company="StartupX"
              match="98%"
            />

            <ProjectCard
              title="Business Website"
              category="Web Development"
              budget="10,000"
              company="TechNova"
              match="94%"
            />

          </div>

        </div>

      )}

    </DashboardLayout>
  );
}

export default AIMatch;