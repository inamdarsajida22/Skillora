import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

function SkillTest() {
  const questions = [
    {
      question: "Which keyword is used to declare a variable in JavaScript?",
      options: ["var", "define", "variable", "integer"],
      answer: "var",
    },
    {
      question: "Which symbol is used for comments in JavaScript?",
      options: ["//", "##", "<!--", "**"],
      answer: "//",
    },
    {
      question: "Which method is used to print something in the console?",
      options: ["console.log()", "print()", "write()", "display()"],
      answer: "console.log()",
    },
    {
      question: "Which of these is a JavaScript data type?",
      options: ["String", "HTML", "CSS", "React"],
      answer: "String",
    },
    {
      question: "Which keyword is used to define a constant?",
      options: ["const", "constant", "fixed", "let"],
      answer: "const",
    },
    {
      question: "Which operator is used for strict equality?",
      options: ["==", "=", "===", "!="],
      answer: "===",
    },
    {
      question: "Which method adds an item to the end of an array?",
      options: ["push()", "add()", "insert()", "append()"],
      answer: "push()",
    },
    {
      question: "Which keyword is used to create a function?",
      options: ["function", "func", "create", "method"],
      answer: "function",
    },
    {
      question: "Which value represents true or false?",
      options: ["Boolean", "String", "Number", "Object"],
      answer: "Boolean",
    },
    {
      question:
        "Which language is primarily used to make web pages interactive?",
      options: ["JavaScript", "HTML", "CSS", "SQL"],
      answer: "JavaScript",
    },
  ];

  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [finalScore, setFinalScore] = useState(null);

  const startTest = () => {
    setStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setCorrectAnswers(0);
    setFinalScore(null);
  };

  const nextQuestion = () => {
    if (!selectedAnswer) {
      alert("Please select an answer.");
      return;
    }

    const isCorrect =
      selectedAnswer === questions[currentQuestion].answer;

    const updatedCorrectAnswers = isCorrect
      ? correctAnswers + 1
      : correctAnswers;

    if (currentQuestion === questions.length - 1) {
      const percentage = Math.round(
        (updatedCorrectAnswers / questions.length) * 100
      );

      setCorrectAnswers(updatedCorrectAnswers);
      setFinalScore(percentage);
      setSelectedAnswer("");
      return;
    }

    setCorrectAnswers(updatedCorrectAnswers);
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer("");
  };

  const retryTest = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setCorrectAnswers(0);
    setFinalScore(null);
  };

  return (
    <DashboardLayout>

      <div className="test-card">

        {/* START SCREEN */}
        {!started && finalScore === null && (
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

        {/* QUIZ SCREEN */}
        {started && finalScore === null && (
          <>
            <div className="quiz-header">

              <span>
                Question {currentQuestion + 1} / {questions.length}
              </span>

              <span>
                🎯 {Math.round(
                  ((currentQuestion + 1) / questions.length) * 100
                )}%
              </span>

            </div>


            <h1>
              Question {currentQuestion + 1}
            </h1>


            <p className="question-text">
              {questions[currentQuestion].question}
            </p>


            {/* OPTIONS */}
            <div className="quiz-options">

              {questions[currentQuestion].options.map(
                (option, index) => (

                  <button
                    key={option}
                    className={
                      selectedAnswer === option
                        ? "selected-option"
                        : ""
                    }
                    onClick={() =>
                      setSelectedAnswer(option)
                    }
                  >

                    <span className="option-label">
                      {String.fromCharCode(65 + index)})
                    </span>

                    <span>
                      {option}
                    </span>

                  </button>

                )
              )}

            </div>


            {/* NEXT BUTTON */}
            <button
              className="primary-btn"
              onClick={nextQuestion}
            >
              {currentQuestion === questions.length - 1
                ? "Submit Test ✓"
                : "Next Question →"}
            </button>

          </>
        )}


        {/* RESULT SCREEN */}
        {finalScore !== null && (
          <>
            <div className="big-icon">🎉</div>

            <h1>Test Completed!</h1>

            <div className="score">
              {finalScore}%
            </div>

            <p>
              You answered {correctAnswers} out of{" "}
              {questions.length} questions correctly.
            </p>


            {finalScore >= 70 ? (
              <>
                <h2>🏆 Congratulations!</h2>

                <p>
                  Your JavaScript skill is verified.
                </p>

                <div className="skill-badge">
                  🏆 JavaScript Verified Skill
                </div>
              </>
            ) : (
              <>
                <h2>💪 Keep Practicing!</h2>

                <p>
                  You need 70% to pass the skill test.
                </p>
              </>
            )}


            <div className="test-result-actions">

              <button
                className="primary-btn"
                onClick={retryTest}
              >
                🔄 Retake Test
              </button>

              <Link
                to="/student/skills"
                className="small-btn"
              >
                ⚡ My Skills
              </Link>

            </div>

          </>
        )}

      </div>

    </DashboardLayout>
  );
}

export default SkillTest;