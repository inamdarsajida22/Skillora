import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

function StudentProfile() {
  const [editing, setEditing] = useState(false);

  const [name, setName] = useState("Student Name");
  const [about, setAbout] = useState(
    "Passionate student interested in web development, UI/UX and building real-world projects."
  );

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setEditing(false);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <DashboardLayout>

      {/* ================= PROFILE HEADER ================= */}
      <div className="profile-cover">

        <div className="big-avatar">
          👩‍💻
        </div>

        <div>
          {editing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="profile-edit-input"
            />
          ) : (
            <h1>{name}</h1>
          )}

          <p>
            Computer Science Student • India
          </p>
        </div>

        {!editing ? (
          <button
            className="primary-btn"
            onClick={() => setEditing(true)}
          >
            ✏️ Edit Profile
          </button>
        ) : (
          <button
            className="primary-btn"
            onClick={handleSave}
          >
            💾 Save Profile
          </button>
        )}

      </div>


      {/* ================= SUCCESS MESSAGE ================= */}
      {saved && (
        <div className="success">
          ✅ Profile updated successfully!
        </div>
      )}


      {/* ================= PROFILE CONTENT ================= */}
      <div className="profile-grid">

        {/* ABOUT */}
        <div className="profile-card">

          <h2>About Me</h2>

          {editing ? (
            <textarea
              rows="5"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          ) : (
            <p>{about}</p>
          )}


          <h3>Education</h3>

          <p>
            🎓 Bachelor / College Student
          </p>

        </div>


        {/* SKILLS */}
        <div className="profile-card">

          <h2>Skills</h2>

          <div className="skill-tags">

            <span>React.js ✓</span>
            <span>JavaScript ✓</span>
            <span>HTML ✓</span>
            <span>CSS ✓</span>
            <span>UI/UX ✓</span>

          </div>

          <Link
            to="/student/skills"
            className="small-btn"
          >
            ⚡ Manage Skills
          </Link>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default StudentProfile;