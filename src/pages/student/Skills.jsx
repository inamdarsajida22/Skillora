import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

function Skills() {

  const [skills, setSkills] = useState([
    "React.js",
    "JavaScript",
    "HTML",
    "CSS"
  ]);

  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {

    if (newSkill.trim()) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  return (
    <DashboardLayout>

      <div className="page-header">
        <div>
          <h1>My Skills ⚡</h1>
          <p>Add skills to get better project matches.</p>
        </div>
      </div>

      <div className="form-card">

        <h2>Add New Skill</h2>

        <div className="add-skill">

          <input
            placeholder="Example: Python"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />

          <button
            className="primary-btn"
            onClick={addSkill}
          >
            + Add
          </button>

        </div>

        <div className="skill-tags">

          {skills.map((skill, index) => (
            <span key={index}>
              {skill} ✓
            </span>
          ))}

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Skills;