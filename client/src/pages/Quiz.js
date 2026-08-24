import axios from "axios";
import API_URL from "../config";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/quiz.css";

import test1 from "../data/test1.json";
import test2 from "../data/test2.json";
import test3 from "../data/test3.json";
import test4 from "../data/test4.json";
import test5 from "../data/test5.json";
import test6 from "../data/test6.json";
import test7 from "../data/test7.json";
import test8 from "../data/test8.json";
import test9 from "../data/test9.json";
import test10 from "../data/test10.json";
import test11 from "../data/test11.json";
import test12 from "../data/test12.json";

import Timer from "../components/Timer";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";


function Quiz() {

    const navigate = useNavigate();

    /* ==============================
          SELECTED TEST
    ============================== */

    const selectedTest = localStorage.getItem("selectedTest");

    /* ==============================
          TEST DATA
    ============================== */

    const testData = {

        test1: test1,
        test2: test2,
        test3: test3,
        test4: test4,
        test5: test5,
        test6: test6,
        test7: test7,
        test8: test8,
        test9: test9,
        test10: test10,
        test11: test11,
        test12: test12

    };

    const questions = testData[selectedTest] || test1;

    const totalQuestions = questions.length;


    /* ==============================
          TEST TITLES
    ============================== */

    const testTitles = {

        test1: "Java Basics 1",

        test2: "Java Fundamentals 1",

        test3: "AI & Data Science",

        test4: "Python & Data Science",

        test5: "Statistics & Machine Learning",

        test6: "Machine Learning & AI",

        test7: "Full Stack Web Development",

        test8: "React & JavaScript",

        test9: "Web APIs & Databases",

        test10: "Generative AI & LLMs",

        test11: "RAG, Embeddings & AI Systems",

        test12: "Coding, Debugging & Aptitude"

    };


    const testTitle =
        testTitles[selectedTest] || "Mock Test";


    /* ==============================
          STUDENT
    ============================== */

    const [student, setStudent] = useState(null);


    /* ==============================
          STATES
    ============================== */

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [answers, setAnswers] = useState({});

    const [submitted, setSubmitted] = useState(false);

    const [showSubmitModal, setShowSubmitModal] = useState(false);


    /* ==============================
          INITIAL CHECK
    ============================== */

    useEffect(() => {

        const storedStudent =
            JSON.parse(localStorage.getItem("student"));

        if (!storedStudent) {

            navigate("/");

            return;

        }

        if (!selectedTest || !testData[selectedTest]) {

            navigate("/tests");

            return;

        }

        setStudent(storedStudent);

    }, [navigate, selectedTest]);


    /* ==============================
          ANSWER
    ============================== */

    const handleAnswer = (option) => {

        setAnswers((prev) => ({

            ...prev,

            [currentQuestion]: option

        }));

    };


    /* ==============================
          NEXT
    ============================== */

    const nextQuestion = () => {

        if (
            currentQuestion <
            totalQuestions - 1
        ) {

            setCurrentQuestion(
                currentQuestion + 1
            );

        }

    };


    /* ==============================
          PREVIOUS
    ============================== */

    const previousQuestion = () => {

        if (currentQuestion > 0) {

            setCurrentQuestion(
                currentQuestion - 1
            );

        }

    };


    /* ==============================
          QUESTION PALETTE
    ============================== */

    const jumpToQuestion = (index) => {

        setCurrentQuestion(index);

    };


    /* ==============================
          CALCULATE SCORE
    ============================== */

    const calculateScore = () => {

        let score = 0;

        questions.forEach(
            (question, index) => {

                if (
                    answers[index] ===
                    question.answer
                ) {

                    score++;

                }

            }
        );

        return score;

    };


    /* ==============================
          SUBMIT TEST
    ============================== */

    const submitTest = async () => {

        if (submitted) return;

        setShowSubmitModal(false);

        const score =
            calculateScore();


        const result = {

            student,

            testName: selectedTest,

            testTitle: testTitle,

            score,

            total: totalQuestions,

            percentage:
                (
                    (score / totalQuestions) *
                    100
                ).toFixed(2),

            answers,

            submittedAt:
                new Date().toLocaleString()

        };


        /* Save result locally */

        localStorage.setItem(
            "result",
            JSON.stringify(result)
        );


        /* Save result to backend */

        try {

            await axios.post(

                `${API_URL}/api/submit`,

                result

            );

            console.log(
                "Result Saved Successfully"
            );

        } catch (err) {

            console.log(
                "Unable to save result:",
                err
            );

        }


        /* Remove exam timer */

        localStorage.removeItem(
            "examStartTime"
        );


        setSubmitted(true);


        /* Go to result */

        navigate("/result");

    };


    /* ==============================
          AUTO SUBMIT
    ============================== */

    const autoSubmit = async () => {

        if (submitted) return;

        const score =
            calculateScore();


        const result = {

            student,

            testName: selectedTest,

            testTitle: testTitle,

            score,

            total: totalQuestions,

            percentage:
                (
                    (score / totalQuestions) *
                    100
                ).toFixed(2),

            answers,

            submittedAt:
                new Date().toLocaleString()

        };


        /* Save locally */

        localStorage.setItem(
            "result",
            JSON.stringify(result)
        );


        /* Save backend */

        try {

            await axios.post(

                `${API_URL}/api/submit`,

                result

            );

        } catch (err) {

            console.log(
                "Auto submit error:",
                err
            );

        }


        localStorage.removeItem(
            "examStartTime"
        );


        setSubmitted(true);

        setShowSubmitModal(false);


        navigate("/result");

    };


    /* ==============================
          WAIT FOR STUDENT
    ============================== */

    if (!student) {

        return null;

    }


    /* ==============================
          UI
    ============================== */

    return (

        <div className="quiz-page">


            {/* =========================
                    HEADER
            ========================= */}

            <div className="quiz-header">

                <div>

                    <h2>

                        {testTitle}

                    </h2>

                    <p>

                        Candidate :

                        <strong>
                            {" "}
                            {student.name}
                        </strong>

                    </p>

                </div>


                <Timer
                    onTimeUp={autoSubmit}
                />

            </div>


            {/* =========================
                  PROGRESS BAR
            ========================= */}

            <ProgressBar

                current={
                    currentQuestion + 1
                }

                total={
                    totalQuestions
                }

            />


            {/* =========================
                  MAIN CONTAINER
            ========================= */}

            <div className="quiz-container">


                {/* =========================
                     LEFT PANEL
                ========================= */}

                <div className="student-panel">

                    <h3>
                        Candidate Details
                    </h3>

                    <hr />


                    <p>
                        <strong>
                            Name
                        </strong>
                    </p>

                    <span>
                        {student.name}
                    </span>


                    <p>
                        <strong>
                            USN / URN
                        </strong>
                    </p>

                    <span>
                        {student.usn}
                    </span>


                    <p>
                        <strong>
                            College
                        </strong>
                    </p>

                    <span>
                        {student.college}
                    </span>


                    <p>
                        <strong>
                            Branch
                        </strong>
                    </p>

                    <span>
                        {student.branch}
                    </span>


                    <p>
                        <strong>
                            Semester
                        </strong>
                    </p>

                    <span>
                        {student.semester}
                    </span>


                    {/* =========================
                         PROGRESS
                    ========================= */}

                    <div className="status-box">

                        <h4>
                            Progress
                        </h4>


                        <p>

                            Answered :

                            {
                                Object.keys(
                                    answers
                                ).length
                            }

                            {" / "}

                            {totalQuestions}

                        </p>


                        <p>

                            Remaining :

                            {
                                totalQuestions -
                                Object.keys(
                                    answers
                                ).length
                            }

                        </p>

                    </div>

                </div>


                {/* =========================
                    CENTER QUESTION
                ========================= */}

                <div className="question-section">


                    <h3>

                        Question{" "}

                        {currentQuestion + 1}

                        {" / "}

                        {totalQuestions}

                    </h3>


                    <QuestionCard

                        question={
                            questions[
                                currentQuestion
                            ]
                        }

                        selected={
                            answers[
                                currentQuestion
                            ]
                        }

                        onSelect={
                            handleAnswer
                        }

                    />


                    {/* =========================
                         NAVIGATION
                    ========================= */}

                    <div className="navigation-buttons">


                        <button

                            className="previous"

                            disabled={
                                currentQuestion === 0
                            }

                            onClick={
                                previousQuestion
                            }

                        >

                            ← Previous

                        </button>


                        <button

                            className="next"

                            disabled={
                                currentQuestion ===
                                totalQuestions - 1
                            }

                            onClick={
                                nextQuestion
                            }

                        >

                            Next →

                        </button>


                    </div>

                </div>


                {/* =========================
                    RIGHT PALETTE
                ========================= */}

                <div className="question-palette">


                    <h3>
                        Question Palette
                    </h3>


                    <div className="palette-grid">


                        {questions.map(
                            (q, index) => (

                                <button

                                    key={index}

                                    className={`
                                        palette-btn
                                        ${
                                            currentQuestion ===
                                            index

                                                ? "current"

                                                : answers[index]

                                                ? "answered"

                                                : "unanswered"
                                        }
                                    `}

                                    onClick={() =>
                                        jumpToQuestion(
                                            index
                                        )
                                    }

                                >

                                    {index + 1}

                                </button>

                            )
                        )}

                    </div>


                    {/* =========================
                         LEGEND
                    ========================= */}

                    <div className="palette-legend">


                        <div className="legend-item">

                            <span
                                className="legend current-box"
                            ></span>

                            Current

                        </div>


                        <div className="legend-item">

                            <span
                                className="legend answered-box"
                            ></span>

                            Answered

                        </div>


                        <div className="legend-item">

                            <span
                                className="legend unanswered-box"
                            ></span>

                            Unanswered

                        </div>


                    </div>


                    {/* =========================
                         SUBMIT BUTTON
                    ========================= */}

                    <button

                        className="submit-btn"

                        disabled={
                            Object.keys(
                                answers
                            ).length !==
                            totalQuestions
                        }

                        onClick={() =>
                            setShowSubmitModal(
                                true
                            )
                        }

                    >

                        Submit Assessment

                    </button>


                    {/* =========================
                         SUBMIT MODAL
                    ========================= */}

                    {showSubmitModal && (

                        <div

                            className="modal-overlay"

                            onClick={() =>
                                setShowSubmitModal(
                                    false
                                )
                            }

                        >

                            <div

                                className="submit-modal"

                                onClick={(e) =>
                                    e.stopPropagation()
                                }

                            >

                                <h2>
                                    📝 Submit Assessment
                                </h2>


                                <p>

                                    You have answered
                                    all questions
                                    successfully.

                                    <br />

                                    After submission,
                                    your responses
                                    cannot be changed.

                                </p>


                                <div className="modal-buttons">


                                    <button

                                        className="cancel-btn"

                                        onClick={() =>
                                            setShowSubmitModal(
                                                false
                                            )
                                        }

                                    >

                                        Cancel

                                    </button>


                                    <button

                                        className="confirm-btn"

                                        onClick={
                                            submitTest
                                        }

                                    >

                                        Submit

                                    </button>


                                </div>

                            </div>

                        </div>

                    )}

                </div>

            </div>


            {/* =========================
                    FOOTER
            ========================= */}

            <footer className="footer">

                © 2026 EETIRP LTD. |
                Empowering Student Innovation

            </footer>


        </div>

    );

}


export default Quiz;