import StudentSidebar from "./StudentSidebar";
import ClientSidebar from "./ClientSidebar";

function DashboardLayout({ children, type = "student" }) {

  return (
    <div className="dashboard-layout">

      {type === "student" ? (
        <StudentSidebar />
      ) : (
        <ClientSidebar />
      )}

      <main className="dashboard-content">
        {children}
      </main>

    </div>
  );
}

export default DashboardLayout;