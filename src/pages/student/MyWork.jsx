import DashboardLayout from "../../components/DashboardLayout";

function MyWork() {

  return (
    <DashboardLayout>

      <div className="page-header">
        <div>
          <h1>My Work 💼</h1>
          <p>Manage your ongoing freelance projects.</p>
        </div>
      </div>

      <div className="work-grid">

        <div className="work-card">
          <span className="work-status">In Progress</span>
          <h2>E-commerce Website</h2>
          <p>Client: TechNova</p>

          <div className="progress">
            <div></div>
          </div>

          <small>65% completed</small>

          <button className="primary-btn">
            Open Workspace →
          </button>
        </div>

        <div className="work-card">
          <span className="completed">Completed</span>
          <h2>Social Media Design</h2>
          <p>Client: Brandify</p>

          <div className="progress complete">
            <div></div>
          </div>

          <small>100% completed</small>

          <button className="outline-btn">
            View Project
          </button>
        </div>

      </div>

    </DashboardLayout>
  );
}

export default MyWork;