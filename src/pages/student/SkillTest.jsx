import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

function SkillTest() {

  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(null);

  const startTest = () => {
    setStarted(true);
  };

  const submitTest = () => {
    setScore(85);
  };

  return (
    <DashboardLayout>

      <div className="test-card">

        {!started && score === null && (
          <>
            <div className="big-icon">🧪</div>

            <h1>JavaScript Skill Test</h1>

            <p>
              Test your knowledge and earn a verified skill badge.
            </p>

            <div className="test-details">
              <span>📝 10 Questions</span>
              <span>⏱ 10 Minutes</span>
              <span>🏆 Skill Badge</span>
            </div>

            <button
              className="primary-btn"
              onClick={startTest}
            >
              Start Test →
            </button>
          </>
        )}

        {started && score === null && (
          <>
            <h1>Question 1 / 10</h1>

            <p>
              Which keyword is used to declare a variable in JavaScript?
            </p>

            <div className="quiz-options">

              <button onClick={submitTest}>var</button>
              <button onClick={submitTest}>define</button>
              <button onClick={submitTest}>variable</button>
              <button onClick={submitTest}>integer</button>

            </div>
          </>
        )}

        {score !== null && (
          <>
            <div className="big-icon">🎉</div>

            <h1>Test Completed!</h1>

            <div className="score">
              {score}%
            </div>

            <p>
              Congratulations! Your JavaScript skill is verified.
            </p>

          </>
        )}

      </div>

    </DashboardLayout>
  );
}

export default SkillTest;