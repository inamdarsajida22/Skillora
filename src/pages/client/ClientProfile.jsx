import DashboardLayout from "../../components/DashboardLayout";

function ClientProfile() {

  return (
    <DashboardLayout type="client">

      <div className="profile-cover">

        <div className="big-avatar">
          🏢
        </div>

        <div>
          <h1>TechNova Solutions</h1>
          <p>Technology Company • India</p>
        </div>

        <button className="primary-btn">
          ✏️ Edit Profile
        </button>

      </div>

      <div className="profile-card">

        <h2>About Company</h2>

        <p>
          We work with talented students and young professionals
          to build innovative digital products.
        </p>

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