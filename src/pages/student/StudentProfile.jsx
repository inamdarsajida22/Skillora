import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

function StudentProfile() {
  const [editing, setEditing] = useState(false);

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [education, setEducation] = useState(
    "Bachelor / College Student"
  );

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= GET LOGGED-IN USER =================
  const storedUser = localStorage.getItem("skilloraUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const userId = user?.id;

  // ================= LOAD PROFILE =================
  useEffect(() => {
    if (!userId) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    fetch(`https://skillora-ex4a.onrender.com/api/profile/${userId}`)
      .then(async (response) => {
        if (response.status === 404) {
          // Profile doesn't exist yet
          setName(user?.name || "Student Name");
          setAbout(
            "Passionate student interested in web development, UI/UX and building real-world projects."
          );
          setEducation("Bachelor / College Student");
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to load profile");
        }

        const data = await response.json();

        setName(data.profile.name || user?.name || "Student Name");
        setAbout(data.profile.about || "");
        setEducation(
          data.profile.education || "Bachelor / College Student"
        );

        setLoading(false);
      })
      .catch(() => {
        setError("Unable to connect to backend.");
        setLoading(false);
      });
  }, [userId]);

  // ================= SAVE PROFILE =================
  const handleSave = async () => {
    if (!userId) {
      setError("User not logged in.");
      return;
    }

    setError("");

    try {
      const params = new URLSearchParams();

      params.append("name", name);
      params.append("about", about);
      params.append("education", education);

      const response = await fetch(
        `https://skillora-ex4a.onrender.com/api/profile/${userId}?${params.toString()}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to save profile");
      }

      // Update localStorage name also
      const updatedUser = {
        ...user,
        name: name,
      };

      localStorage.setItem(
        "skilloraUser",
        JSON.stringify(updatedUser)
      );

      setEditing(false);
      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <DashboardLayout>
        <div className="profile-card">
          <h2>Loading Profile...</h2>
          <p>Please wait...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      {/* ================= ERROR ================= */}
      {error && (
        <div className="error">
          ❌ {error}
        </div>
      )}

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
              placeholder="Enter your name"
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

        {/* ================= ABOUT ================= */}
        <div className="profile-card">

          <h2>About Me</h2>

          {editing ? (
            <textarea
              rows="5"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Tell something about yourself..."
            />
          ) : (
            <p>
              {about || "No information added yet."}
            </p>
          )}

          <h3>Education</h3>

          {editing ? (
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="Enter your education"
            />
          ) : (
            <p>
              🎓 {education}
            </p>
          )}

        </div>

        {/* ================= SKILLS ================= */}
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