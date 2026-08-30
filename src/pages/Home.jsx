import { Link } from "react-router-dom";

function Home() {

  return (
    <main>

      <section className="hero">

        <div className="hero-content">

          <div className="hero-badge">
            🚀 Built for the next generation
          </div>

          <h1>
            Turn Your <span>Skills</span>
            <br />
            Into Real Opportunities.
          </h1>

          <p>
            Skillora connects talented students with real clients,
            freelance projects and career opportunities.
          </p>

          <div className="hero-buttons">

            <Link to="/register" className="primary-btn">
              Start as Student →
            </Link>

            <Link to="/register" className="outline-btn">
              Hire Student
            </Link>

          </div>

          <div className="hero-stats">

            <div>
              <b>1,500+</b>
              <small>Students</small>
            </div>

            <div>
              <b>700+</b>
              <small>Projects</small>
            </div>

            <div>
              <b>400+</b>
              <small>Clients</small>
            </div>

          </div>

        </div>

        <div className="hero-visual">

          <div className="visual-circle">
            👩‍💻
          </div>

          <div className="floating-box box-one">
            ✨ 94% Match
            <small>React Developer</small>
          </div>

          <div className="floating-box box-two">
            ⭐ 4.9 Rating
            <small>Top Student</small>
          </div>

          <div className="floating-box box-three">
            💰 ₹15,000
            <small>Project Earned</small>
          </div>

        </div>

      </section>


      <section className="features-section">

        <p className="section-label">WHY SKILLORA?</p>

        <h2>
          One Platform. Multiple Opportunities.
        </h2>

        <div className="feature-grid">

          <div className="feature-card">
            <div>🎯</div>
            <h3>Smart Project Matching</h3>
            <p>
              Find projects based on your skills and interests.
            </p>
          </div>

          <div className="feature-card">
            <div>🤖</div>
            <h3>AI Skill Match</h3>
            <p>
              Get personalized project recommendations.
            </p>
          </div>

          <div className="feature-card">
            <div>🧪</div>
            <h3>Skill Verification</h3>
            <p>
              Take tests and show clients your verified skills.
            </p>
          </div>

          <div className="feature-card">
            <div>💼</div>
            <h3>Real Experience</h3>
            <p>
              Work on real projects and build your portfolio.
            </p>
          </div>

        </div>

      </section>


      <section className="cta-section">

        <h2>
          Your next opportunity is waiting.
        </h2>

        <p>
          Create your Skillora profile and start building your career.
        </p>

        <Link to="/register" className="primary-btn">
          Join Skillora →
        </Link>

      </section>

    </main>
  );
}

export default Home;