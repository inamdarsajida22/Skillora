import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

function ClientProfile() {
  const [profile, setProfile] = useState(null);

  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const user = JSON.parse(localStorage.getItem("skilloraUser"));
  const userId = user?.id;

  // Load client profile
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    fetch(`https://skillora-ex4a.onrender.com/api/client-profile/${userId}`)
      .then(async (res) => {
        if (res.status === 404) {
          // Profile doesn't exist yet
          setCompanyName(user?.name || "");
          setLocation("India");
          setAbout(
            "We work with talented students and young professionals to build innovative digital products."
          );
          setEditing(true);
          return null;
        }

        if (!res.ok) {
          throw new Error("Failed to load profile");
        }

        return res.json();
      })
      .then((data) => {
        if (data?.success) {
          setProfile(data.profile);

          setCompanyName(data.profile.company_name || "");
          setLocation(data.profile.location || "");
          setAbout(data.profile.about || "");
        }
      })
      .catch((error) => {
        console.error("Profile Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  // Save / Update profile
  const saveProfile = async () => {
    if (!companyName.trim()) {
      alert("Please enter company name.");
      return;
    }

    if (!userId) {
      alert("Please login first.");
      return;
    }

    setSaving(true);

    try {
      const url =
        `https://skillora-ex4a.onrender.com/api/client-profile/${userId}` +
        `?company_name=${encodeURIComponent(companyName)}` +
        `&location=${encodeURIComponent(location)}` +
        `&about=${encodeURIComponent(about)}`;

      const response = await fetch(url, {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to save profile");
      }

      if (data.success) {
        setProfile(data.profile);
        setEditing(false);

        // Update logged-in user's displayed name
        const updatedUser = {
          ...user,
          name: companyName,
        };

        localStorage.setItem(
          "skilloraUser",
          JSON.stringify(updatedUser)
        );

        alert("Client profile saved successfully! ✅");
      }
    } catch (error) {
      console.error("Save Profile Error:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout type="client">
        <div className="profile-card">
          <h2>Loading Profile...</h2>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout type="client">

      {/* PROFILE HEADER */}
      <div className="profile-cover">

        <div className="big-avatar">
          🏢
        </div>

        <div>
          {editing ? (
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Company Name"
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "20px",
                fontWeight: "600",
              }}
            />
          ) : (
            <>
              <h1>
                {profile?.company_name || companyName || "Your Company"}
              </h1>

              <p>
                Technology Company •{" "}
                {profile?.location || location || "India"}
              </p>
            </>
          )}
        </div>

        {!editing && (
          <button
            className="primary-btn"
            onClick={() => setEditing(true)}
          >
            ✏️ Edit Profile
          </button>
        )}

        {editing && (
          <button
            className="primary-btn"
            onClick={saveProfile}
            disabled={saving}
          >
            {saving ? "Saving..." : "💾 Save Profile"}
          </button>
        )}

      </div>

      {/* ABOUT COMPANY */}
      <div className="profile-card">

        <h2>About Company</h2>

        {editing ? (
          <>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />

            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Tell students about your company..."
              rows="5"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                resize: "vertical",
              }}
            />
          </>
        ) : (
          <p>
            {profile?.about ||
              "We work with talented students and young professionals to build innovative digital products."}
          </p>
        )}

        {/* COMPANY STATS */}
        <div className="company-stats">

          <div>
            <b>32</b>
            <small>Projects</small>
          </div>

          <div>
            <b>4.9</b>
            <small>Rating</small>
          </div>

          <div>
            <b>25</b>
            <small>Hires</small>
          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default ClientProfile;