import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

function Proposals() {
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [hired, setHired] = useState({});

  const proposals = [
    {
      id: 1,
      avatar: "👩‍💻",
      name: "Aarohi Sharma",
      role: "React Developer",
      rating: "4.9",
      message:
        "I can complete your website within 10 days.",
      experience: "1+ Year",
      skills: "React, JavaScript, HTML, CSS",
      project: "College Website Redesign",
      budget: "₹20,000",
      delivery: "10 Days",
    },
    {
      id: 2,
      avatar: "👨‍💻",
      name: "Rahul Patil",
      role: "Full Stack Developer",
      rating: "4.8",
      message:
        "Experienced in React and Node.js.",
      experience: "2+ Years",
      skills: "React, Node.js, MongoDB, JavaScript",
      project: "College Website Redesign",
      budget: "₹18,000",
      delivery: "12 Days",
    },
  ];

  const handleHire = (id) => {
    setHired((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  return (
    <DashboardLayout type="client">

      {/* HEADER */}

      <div className="page-header">

        <div>
          <p className="welcome">CLIENT WORKSPACE</p>

          <h1>Project Proposals 📩</h1>

          <p>
            Review students who applied to your projects.
          </p>
        </div>

      </div>


      {/* PROPOSALS */}

      <div className="proposal-list">

        {proposals.map((proposal) => (

          <div className="proposal-card" key={proposal.id}>

            <div className="student-avatar">
              {proposal.avatar}
            </div>


            <div className="proposal-info">

              <h3>{proposal.name}</h3>

              <p>
                {proposal.role} • ⭐ {proposal.rating}
              </p>

              <p>
                {proposal.message}
              </p>

              {hired[proposal.id] && (
                <span className="hired-status">
                  ✅ Hired
                </span>
              )}

            </div>


            <div className="proposal-actions">

              {/* VIEW */}

              <button
                className="outline-btn"
                onClick={() =>
                  setSelectedProposal(proposal)
                }
              >
                👁 View
              </button>


              {/* HIRE */}

              <button
                className="primary-btn"
                onClick={() => handleHire(proposal.id)}
                disabled={hired[proposal.id]}
              >
                {hired[proposal.id]
                  ? "Hired ✓"
                  : "Hire ✓"}
              </button>

            </div>

          </div>

        ))}

      </div>


      {/* VIEW PROPOSAL MODAL */}

      {selectedProposal && (

        <div
          className="proposal-modal-overlay"
          onClick={() => setSelectedProposal(null)}
        >

          <div
            className="proposal-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="proposal-modal-close"
              onClick={() => setSelectedProposal(null)}
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
                <small>Experience</small>
                <strong>
                  {selectedProposal.experience}
                </strong>
              </div>

              <div>
                <small>Budget</small>
                <strong>
                  {selectedProposal.budget}
                </strong>
              </div>

              <div>
                <small>Delivery</small>
                <strong>
                  {selectedProposal.delivery}
                </strong>
              </div>

            </div>


            <div className="proposal-modal-section">

              <h4>Project</h4>

              <p>
                {selectedProposal.project}
              </p>

            </div>


            <div className="proposal-modal-section">

              <h4>Skills</h4>

              <p>
                {selectedProposal.skills}
              </p>

            </div>


            <div className="proposal-modal-section">

              <h4>Proposal</h4>

              <p>
                {selectedProposal.message}
              </p>

            </div>


            {/* ACTIONS */}

            <div className="proposal-modal-actions">

              <button
                className="outline-btn"
                onClick={() =>
                  setSelectedProposal(null)
                }
              >
                Close
              </button>

              <button
                className="primary-btn"
                onClick={() => {
                  handleHire(selectedProposal.id);
                  setSelectedProposal(null);
                }}
                disabled={hired[selectedProposal.id]}
              >
                {hired[selectedProposal.id]
                  ? "Already Hired ✓"
                  : "💼 Hire Student"}
              </button>

            </div>

          </div>

        </div>

      )}

    </DashboardLayout>
  );
}

export default Proposals;