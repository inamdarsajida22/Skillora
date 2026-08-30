import DashboardLayout from "../../components/DashboardLayout";

function MyProjects() {

  return (
    <DashboardLayout type="client">

      <div className="page-header">

        <div>
          <h1>My Projects 📁</h1>
          <p>Manage all your posted projects.</p>
        </div>

      </div>

      <div className="client-project-list">

        <div className="client-project">

          <div>
            <h3>E-commerce Website</h3>
            <p>₹20,000 • 6 proposals</p>
          </div>

          <span className="status active-status">
            Hiring
          </span>

          <button className="small-btn">
            Manage
          </button>

        </div>

        <div className="client-project">

          <div>
            <h3>Mobile App Design</h3>
            <p>₹15,000 • 4 proposals</p>
          </div>

          <span className="status">
            In Progress
          </span>

          <button className="small-btn">
            Manage
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default MyProjects;