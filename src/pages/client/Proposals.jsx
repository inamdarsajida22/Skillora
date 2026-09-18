import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

function Proposals() {
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const storedUser = localStorage.getItem("skilloraUser");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const clientId = user?.id;

  // ================= LOAD PROPOSALS =================

  useEffect(() => {
    const loadProposals = async () => {
      try {
        setLoading(true);
        setError("");

        if (!clientId) {
          throw new Error("Please login as a client.");
        }

        // First get all projects
        const projectResponse = await fetch(
          "https://skillora-ex4a.onrender.com/api/projects/"
        );

        if (!projectResponse.ok) {
          throw new Error("Failed to load projects.");
        }

        const projectData = await projectResponse.json();

        // Only this client's projects
        const clientProjects = (projectData.projects || []).filter(
          (project) => project.client_id === clientId
        );

        // Get proposals for each project
        const proposalResults = await Promise.all(
          clientProjects.map(async (project) => {
            const response = await fetch(
              `https://skillora-ex4a.onrender.com/api/proposals/project/${project.id}`
            );

            if (!response.ok) {
              return [];
            }

            const data = await response.json();

            return (data.proposals || []).map((proposal) => ({
              id: proposal.id,
              studentId: proposal.student_id,
              avatar: "👨‍💻",
              name: `Student #${proposal.student_id}`,
              role: "Student Freelancer",
              rating: "New",
              message:
                proposal.message || "No proposal message.",
              experience: "Student",
              skills: project.skills || "Not specified",
              project: project.title,
              projectId: project.id,
              budget:
                proposal.bid_amount || "Not specified",
              delivery: "7-15 Days",
              status: proposal.status || "pending",
            }));
          })
        );

        const allProposals = proposalResults.flat();

        setProposals(allProposals);
        setLoading(false);

      } catch (err) {
        console.error(err);
        setError(
          err.message || "Unable to load proposals."
        );
        setLoading(false);
      }
    };

    loadProposals();
  }, [clientId]);

  // ================= UPDATE STATUS =================

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `https://skillora-ex4a.onrender.com/api/proposals/${id}/status?status=${status}`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to update proposal."
        );
      }

      setProposals((prev) =>
        prev.map((proposal) =>
          proposal.id === id
            ? {
                ...proposal,
                status: status,
              }
            : proposal
        )
      );

      if (selectedProposal?.id === id) {
        setSelectedProposal((prev) => ({
          ...prev,
          status: status,
        }));
      }

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // ================= STATUS CLASS =================

  const getStatusClass = (status) => {
    if (status === "shortlisted") {
      return "status-1";
    }

    if (status === "rejected") {
      return "status-2";
    }

    return "status-0";
  };

  // ================= UI =================

  return (
    <DashboardLayout type="client">

      {/* HEADER */}

      <div className="page-header">
        <div>
          <p className="welcome">
            CLIENT WORKSPACE
          </p>

          <h1>
            Project Proposals 📩
          </h1>

          <p>
            Review students who applied to your projects.
          </p>
        </div>
      </div>


      {/* ERROR */}

      {error && (
        <div className="error">
          ❌ {error}
        </div>
      )}


      {/* LOADING */}

      {loading ? (
        <div className="empty-state">
          <div className="big-icon">
            ⏳
          </div>

          <h2>
            Loading Proposals...
          </h2>

          <p>
            Please wait while we fetch student proposals.
          </p>
        </div>
      ) : proposals.length === 0 ? (

        /* NO PROPOSALS */

        <div className="empty-state">
          <div className="big-icon">
            📩
          </div>

          <h2>
            No Proposals Yet
          </h2>

          <p>
            Students who apply to your projects will appear here.
          </p>
        </div>

      ) : (

        /* PROPOSALS */

        <div className="proposal-list">

          {proposals.map((proposal) => (

            <div
              className="proposal-card"
              key={proposal.id}
            >

              <div className="student-avatar">
                {proposal.avatar}
              </div>


              <div className="proposal-info">

                <h3>
                  {proposal.name}
                </h3>

                <p>
                  {proposal.role} • ⭐ {proposal.rating}
                </p>

                <p>
                  {proposal.message}
                </p>

                <small>
                  Project: <b>{proposal.project}</b>
                </small>

                <br />

                <small>
                  Bid: <b>₹{proposal.budget}</b>
                </small>

                <br />

                <span
                  className={`status ${getStatusClass(
                    proposal.status
                  )}`}
                >
                  {proposal.status === "shortlisted"
                    ? "Shortlisted"
                    : proposal.status === "rejected"
                    ? "Rejected"
                    : "Pending"}
                </span>

              </div>


              {/* ACTIONS */}

              <div className="proposal-actions">

                <button
                  className="outline-btn"
                  onClick={() =>
                    setSelectedProposal(proposal)
                  }
                >
                  👁 View
                </button>

                {proposal.status === "pending" && (
                  <>
                    <button
                      className="primary-btn"
                      onClick={() =>
                        updateStatus(
                          proposal.id,
                          "shortlisted"
                        )
                      }
                    >
                      ✅ Shortlist
                    </button>

                    <button
                      className="small-btn"
                      onClick={() =>
                        updateStatus(
                          proposal.id,
                          "rejected"
                        )
                      }
                    >
                      ❌ Reject
                    </button>
                  </>
                )}

                {proposal.status === "shortlisted" && (
                  <button
                    className="primary-btn"
                    disabled
                  >
                    Shortlisted ✓
                  </button>
                )}

              </div>

            </div>

          ))}

        </div>
      )}


      {/* ================= VIEW MODAL ================= */}

      {selectedProposal && (

        <div
          className="proposal-modal-overlay"
          onClick={() =>
            setSelectedProposal(null)
          }
        >

          <div
            className="proposal-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="proposal-modal-close"
              onClick={() =>
                setSelectedProposal(null)
              }
            >
              ✕
            </button>


            {/* PROFILE */}

            <div className="proposal-modal-avatar">
              {selectedProposal.avatar}
            </div>

            <h2>
              {selectedProposal.name}
            </h2>

            <p className="proposal-modal-role">
              {selectedProposal.role}
            </p>

            <div className="proposal-modal-rating">
              ⭐ {selectedProposal.rating} Rating
            </div>


            {/* DETAILS */}

            <div className="proposal-details-grid">

              <div>
                <small>
                  Experience
                </small>

                <strong>
                  {selectedProposal.experience}
                </strong>
              </div>

              <div>
                <small>
                  Bid Amount
                </small>

                <strong>
                  ₹{selectedProposal.budget}
                </strong>
              </div>

              <div>
                <small>
                  Delivery
                </small>

                <strong>
                  {selectedProposal.delivery}
                </strong>
              </div>

            </div>


            <div className="proposal-modal-section">

              <h4>
                Project
              </h4>

              <p>
                {selectedProposal.project}
              </p>

            </div>


            <div className="proposal-modal-section">

              <h4>
                Skills
              </h4>

              <p>
                {selectedProposal.skills}
              </p>

            </div>


            <div className="proposal-modal-section">

              <h4>
                Proposal
              </h4>

              <p>
                {selectedProposal.message}
              </p>

            </div>


            {/* MODAL ACTIONS */}

            <div className="proposal-modal-actions">

              <button
                className="outline-btn"
                onClick={() =>
                  setSelectedProposal(null)
                }
              >
                Close
              </button>

              {selectedProposal.status === "pending" && (
                <>
                  <button
                    className="small-btn"
                    onClick={() => {
                      updateStatus(
                        selectedProposal.id,
                        "rejected"
                      );

                      setSelectedProposal(null);
                    }}
                  >
                    ❌ Reject
                  </button>

                  <button
                    className="primary-btn"
                    onClick={() => {
                      updateStatus(
                        selectedProposal.id,
                        "shortlisted"
                      );

                      setSelectedProposal(null);
                    }}
                  >
                    ✅ Shortlist Student
                  </button>
                </>
              )}

            </div>

          </div>

        </div>

      )}

    </DashboardLayout>
  );
}

export default Proposals;