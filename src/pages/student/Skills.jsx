import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // ================= GET LOGGED-IN USER =================
  const storedUser = localStorage.getItem("skilloraUser");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user?.id;

  // ================= LOAD SKILLS =================
  useEffect(() => {
    if (!userId) {
      setMessage("⚠️ User not logged in.");
      setLoading(false);
      return;
    }

    fetch(`http://127.0.0.1:8000/api/skills/${userId}`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to load skills");
        }

        const data = await response.json();

        setSkills(data.skills || []);
        setLoading(false);
      })
      .catch(() => {
        setMessage("❌ Unable to connect to backend.");
        setLoading(false);
      });
  }, [userId]);

  // ================= ADD SKILL =================
  const addSkill = async () => {
    const skill = newSkill.trim();

    if (!skill) {
      setMessage("⚠️ Please enter a skill.");
      return;
    }

    // Duplicate check
    const alreadyExists = skills.some(
      (item) =>
        item.skill_name.toLowerCase() === skill.toLowerCase()
    );

    if (alreadyExists) {
      setMessage("⚠️ This skill already exists.");
      return;
    }

    try {
      const params = new URLSearchParams();

      params.append("skill_name", skill);
      params.append("level", "Beginner");

      const response = await fetch(
        `http://127.0.0.1:8000/api/skills/${userId}?${params.toString()}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to add skill");
      }

      setSkills([...skills, data.skill]);

      setNewSkill("");

      setMessage("✅ Skill added successfully!");

      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  // ================= DELETE SKILL =================
  const removeSkill = async (skillId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/skills/${skillId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to delete skill");
      }

      setSkills(
        skills.filter((skill) => skill.id !== skillId)
      );

      setMessage("🗑️ Skill removed.");

      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  // ================= ENTER KEY =================
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

        {/* ================= MESSAGE ================= */}
        {message && (
          <p className="success">
            {message}
          </p>
        )}

        {/* ================= LOADING ================= */}
        {loading ? (
          <p>Loading skills...</p>
        ) : (
          <>
            {/* ================= SKILLS ================= */}
            <div className="skill-tags">

              {skills.map((skill) => (

                <span key={skill.id}>

                  {skill.skill_name} ✓

                  <button
                    onClick={() => removeSkill(skill.id)}
                    title={`Remove ${skill.skill_name}`}
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

            {/* ================= EMPTY STATE ================= */}
            {skills.length === 0 && (
              <p>
                No skills added yet. Add your first skill above.
              </p>
            )}
          </>
        )}

      </div>

    </DashboardLayout>
  );
}

export default Skills;