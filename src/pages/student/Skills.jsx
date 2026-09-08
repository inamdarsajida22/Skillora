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

  const [message, setMessage] = useState("");

  const addSkill = () => {

    const skill = newSkill.trim();

    if (!skill) {
      setMessage("⚠️ Please enter a skill.");
      return;
    }

    // Duplicate skill check
    const alreadyExists = skills.some(
      (item) => item.toLowerCase() === skill.toLowerCase()
    );

    if (alreadyExists) {
      setMessage("⚠️ This skill already exists.");
      return;
    }

    setSkills([...skills, skill]);

    setNewSkill("");

    setMessage("✅ Skill added successfully!");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };


  const removeSkill = (indexToRemove) => {

    setSkills(
      skills.filter((_, index) => index !== indexToRemove)
    );

    setMessage("🗑️ Skill removed.");
  };


  const handleKeyDown = (e) => {

    if (e.key === "Enter") {
      addSkill();
    }

  };


  return (
    <DashboardLayout>

      {/* ================= HEADER ================= */}
      <div className="page-header">

        <div>

          <h1>My Skills ⚡</h1>

          <p>
            Add skills to get better project matches.
          </p>

        </div>

      </div>


      {/* ================= SKILL FORM ================= */}
      <div className="form-card">

        <h2>Add New Skill</h2>

        <div className="add-skill">

          <input
            placeholder="Example: Python"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            className="primary-btn"
            onClick={addSkill}
          >
            + Add
          </button>

        </div>


        {/* MESSAGE */}
        {message && (
          <p className="success">
            {message}
          </p>
        )}


        {/* ================= SKILLS ================= */}
        <div className="skill-tags">

          {skills.map((skill, index) => (

            <span key={index}>

              {skill} ✓

              <button
                onClick={() => removeSkill(index)}
                title={`Remove ${skill}`}
                style={{
                  marginLeft: "8px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer"
                }}
              >
                ×
              </button>

            </span>

          ))}

        </div>


        {/* EMPTY STATE */}
        {skills.length === 0 && (
          <p>
            No skills added yet. Add your first skill above.
          </p>
        )}

      </div>

    </DashboardLayout>
  );
}

export default Skills;