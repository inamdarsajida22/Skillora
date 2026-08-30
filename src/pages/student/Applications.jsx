import DashboardLayout from "../../components/DashboardLayout";

function Applications() {

  const applications = [
    ["React Website", "TechNova", "Under Review"],
    ["Logo Design", "Brandify", "Shortlisted"],
    ["Python Project", "DataWorks", "Rejected"]
  ];

  return (
    <DashboardLayout>

      <div className="page-header">
        <div>
          <h1>My Applications 📩</h1>
          <p>Track all your project applications.</p>
        </div>
      </div>

      <div className="table-card">

        {applications.map((item, index) => (

          <div className="application-row" key={index}>

            <div>
              <b>{item[0]}</b>
              <small>{item[1]}</small>
            </div>

            <span className={`status status-${index}`}>
              {item[2]}
            </span>

            <button className="small-btn">
              View
            </button>

          </div>

        ))}

      </div>

    </DashboardLayout>
  );
}

export default Applications;