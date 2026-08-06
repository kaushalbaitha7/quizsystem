import axios from "axios";
import API_URL from "../config";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/quiz.css";

import test1 from "../data/test1.json";
import test2 from "../data/test2.json";

import Timer from "../components/Timer";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";

function Quiz() {

    const navigate = useNavigate();

    const student = JSON.parse(localStorage.getItem("student"));

    const selectedTest = localStorage.getItem("selectedTest");

    const questions =
        selectedTest === "test2"
            ? test2
            : test1;

    const totalQuestions = questions.length;

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [showSubmitModal, setShowSubmitModal] = useState(false);

    useEffect(() => {

        if (!student) {
            navigate("/");
        }

    }, [navigate, student]);


    const handleAnswer = (option) => {

        setAnswers((prev) => ({
            ...prev,
            [currentQuestion]: option
        }));

    };

    const nextQuestion = () => {

        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }

    };

    const previousQuestion = () => {

        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }

    };

    const jumpToQuestion = (index) => {

        setCurrentQuestion(index);

    };

    const calculateScore = () => {

        let score = 0;

        questions.forEach((question, index) => {

            if (answers[index] === question.answer) {
                score++;
            }

        });

        return score;

    };

    const submitTest = async () => {

        if (submitted) return;
        setShowSubmitModal(false);

        const score = calculateScore();

        const result = {

    student,

    testName: selectedTest,

    score,

    total: totalQuestions,

    percentage: ((score / totalQuestions) * 100).toFixed(2),

    answers,

    submittedAt: new Date().toLocaleString()

};

        localStorage.setItem("result", JSON.stringify(result));

try {

   await axios.post(
    `${API_URL}/api/submit`,
    result
);

    console.log("Result Saved");

} catch(err){

    console.log(err);

}

localStorage.removeItem("examStartTime");

setSubmitted(true);

navigate("/result");

    };

    const autoSubmit = async () => {

        const score = calculateScore();

        const result = {

    student,

    testName: selectedTest,

    score,

    total: totalQuestions,

    percentage: ((score / totalQuestions) * 100).toFixed(2),

    answers,

    submittedAt: new Date().toLocaleString()

};
localStorage.setItem("result", JSON.stringify(result));
try {

   await axios.post(
    `${API_URL}/api/submit`,
    result
);

} catch(err){

    console.log(err);

}

localStorage.removeItem("examStartTime");
setShowSubmitModal(false);

navigate("/result");
    };

    return (

        <div className="quiz-page">

            {/* ================= HEADER ================= */}

            <div className="quiz-header">

                <div>

                    <h2>
    {selectedTest === "test2"
        ? "Mock Test 2"
        : "Mock Test 1"}
</h2>

                    <p>
                        Candidate :
                        <strong> {student?.name}</strong>
                    </p>

                </div>

                <Timer onTimeUp={autoSubmit} />

            </div>

            {/* =============== Progress =============== */}

            <ProgressBar
                current={currentQuestion + 1}
                total={totalQuestions}
            />

            {/* ============== MAIN CONTAINER ============== */}

            <div className="quiz-container">

                {/* LEFT PANEL */}

                <div className="student-panel">

                    <h3>Candidate Details</h3>

                    <hr />

                    <p><strong>Name</strong></p>
                    <span>{student?.name}</span>

                    <p><strong>USN / URN</strong></p>
                    <span>{student?.usn}</span>

                    <p><strong>College</strong></p>
                    <span>{student?.college}</span>

                    <p><strong>Branch</strong></p>
                    <span>{student?.branch}</span>

                    <p><strong>Semester</strong></p>
                    <span>{student?.semester}</span>

                    <div className="status-box">

                        <h4>Progress</h4>

                        <p>
                            Answered :
                            {
                                Object.keys(answers).length
                            } / {totalQuestions}
                        </p>

                        <p>
                            Remaining :
                            {
                                totalQuestions -
                                Object.keys(answers).length
                            }
                        </p>

                    </div>

                </div>

                {/* CENTER PANEL */}

                <div className="question-section">

                    <h3>

                        Question {currentQuestion + 1}

                        {" / "}

                        {totalQuestions}

                    </h3>

                    <QuestionCard

                        question={questions[currentQuestion]}

                        selected={answers[currentQuestion]}

                        onSelect={handleAnswer}

                    />

                    <div className="navigation-buttons">

                        <button

                            className="previous"

                            disabled={currentQuestion === 0}

                            onClick={previousQuestion}

                        >

                            ← Previous

                        </button>

                        <button

                            className="next"

                            disabled={
                                currentQuestion === totalQuestions - 1
                            }

                            onClick={nextQuestion}

                        >

                            Next →

                        </button>

                    </div>

                </div>
                                {/* RIGHT PANEL */}

                <div className="question-palette">

                    <h3>Question Palette</h3>

                    <div className="palette-grid">

                        {questions.map((q, index) => (

                            <button

                                key={index}

                                className={`
                                palette-btn
                                ${
                                    currentQuestion === index
                                        ? "current"
                                        : answers[index]
                                        ? "answered"
                                        : "unanswered"
                                }
                                `}

                                onClick={() => jumpToQuestion(index)}

                            >

                                {index + 1}

                            </button>

                        ))}

                    </div>

                    <div className="palette-legend">

                        <div className="legend-item">
                            <span className="legend current-box"></span>
                            Current
                        </div>

                        <div className="legend-item">
                            <span className="legend answered-box"></span>
                            Answered
                        </div>

                        <div className="legend-item">
                            <span className="legend unanswered-box"></span>
                            Unanswered
                        </div>

                    </div>

       <button
    className="submit-btn"
    disabled={Object.keys(answers).length !== totalQuestions}
    onClick={() => setShowSubmitModal(true)}
>
    Submit Assessment
</button>
{showSubmitModal && (

<div
    className="modal-overlay"
    onClick={() => setShowSubmitModal(false)}
>

    <div
    className="submit-modal"
    onClick={(e) => e.stopPropagation()}
>

        <h2>📝 Submit Assessment</h2>

        <p>
    You have answered all questions successfully.<br/>
    After submission, your responses cannot be changed.
</p>

        <div className="modal-buttons">

            <button
                className="cancel-btn"
                onClick={() => setShowSubmitModal(false)}
            >
                Cancel
            </button>

            <button
                className="confirm-btn"
                onClick={() => {
                    setShowSubmitModal(false);
                    submitTest();
                }}
            >
                Submit
            </button>

        </div>

    </div>

</div>

)}
                </div>

            </div>
<footer className="footer">
    © 2026 EETIRP LTD. | Empowering Student Innovation
</footer>
        </div>

    );

}

export default Quiz;