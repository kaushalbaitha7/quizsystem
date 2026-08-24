import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import API_URL from "../config";
import "../styles/quiz.css";

// ==========================================
// TEST DATA
// ==========================================

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


// ==========================================
// ALL TEST CONFIGURATION
// ==========================================

const testData = {

    test1: {
        title: "Java Basics 1",
        questions: test1
    },

    test2: {
        title: "Java Fundamentals 1",
        questions: test2
    },

    test3: {
        title: "AI & Data Science",
        questions: test3
    },

    test4: {
        title: "Python & Data Science",
        questions: test4
    },

    test5: {
        title: "Statistics & Machine Learning",
        questions: test5
    },

    test6: {
        title: "Machine Learning & AI",
        questions: test6
    },

    test7: {
        title: "Full Stack Web Development",
        questions: test7
    },

    test8: {
        title: "React & JavaScript",
        questions: test8
    },

    test9: {
        title: "Web APIs & Databases",
        questions: test9
    },

    test10: {
        title: "Generative AI & LLMs",
        questions: test10
    },

    test11: {
        title: "RAG, Embeddings & AI Systems",
        questions: test11
    },

    test12: {
        title: "Coding, Debugging & Aptitude",
        questions: test12
    }

};


// ==========================================
// TEST NAMES
// ==========================================

const testNames = {

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


// ==========================================
// COMPONENT
// ==========================================

function Quiz() {

    const navigate = useNavigate();

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [answers, setAnswers] = useState({});

    const [submitted, setSubmitted] = useState(false);

    const [showSubmitModal, setShowSubmitModal] =
        useState(false);

    const [student, setStudent] = useState(null);

    const [timeUp, setTimeUp] = useState(false);


    // ==========================================
    // SELECTED TEST
    // ==========================================

    const selectedTest =
        localStorage.getItem("selectedTest") || "test1";


    // ==========================================
    // SELECT TEST DATA
    // ==========================================

    const selectedTestData =
        testData[selectedTest] || testData.test1;


    const questions =
        selectedTestData.questions;


    const totalQuestions =
        questions.length;


    // ==========================================
    // LOAD STUDENT
    // ==========================================

    useEffect(() => {

        const storedStudent =
            localStorage.getItem("student");

        if (!storedStudent) {

            navigate("/");

            return;

        }

        try {

            setStudent(
                JSON.parse(storedStudent)
            );

        } catch (error) {

            console.log(
                "Student data error:",
                error
            );

            localStorage.removeItem("student");

            navigate("/");

        }

    }, [navigate]);


    // ==========================================
    // ANSWER QUESTION
    // ==========================================

    const handleAnswer = useCallback((option) => {

        setAnswers((previousAnswers) => ({

            ...previousAnswers,

            [currentQuestion]: option

        }));

    }, [currentQuestion]);


    // ==========================================
    // NEXT QUESTION
    // ==========================================

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


    // ==========================================
    // PREVIOUS QUESTION
    // ==========================================

    const previousQuestion = () => {

        if (currentQuestion > 0) {

            setCurrentQuestion(
                currentQuestion - 1
            );

        }

    };


    // ==========================================
    // JUMP TO QUESTION
    // ==========================================

    const jumpToQuestion = (index) => {

        setCurrentQuestion(index);

    };


    // ==========================================
    // CALCULATE SCORE
    // ==========================================

    const calculateScore = useCallback(() => {

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

    }, [questions, answers]);


    // ==========================================
    // CREATE RESULT
    // ==========================================

    const createResult = useCallback(() => {

        const score =
            calculateScore();


        const percentage =
            totalQuestions > 0
                ? (
                    (score /
                        totalQuestions) *
                    100
                ).toFixed(2)
                : "0.00";


        return {

            student,

            testName: selectedTest,

            testTitle:
                testNames[selectedTest] ||
                "Mock Test",

            score,

            total: totalQuestions,

            percentage,

            answers,

            submittedAt:
                new Date().toLocaleString()

        };

    }, [
        calculateScore,
        totalQuestions,
        student,
        selectedTest,
        answers
    ]);


    // ==========================================
    // SUBMIT RESULT
    // ==========================================

    const submitTest = useCallback(async () => {

        if (submitted) {

            return;

        }


        const result =
            createResult();


        // Save locally first

        localStorage.setItem(
            "result",
            JSON.stringify(result)
        );


        try {

            await axios.post(

                `${API_URL}/api/submit`,

                result

            );


            console.log(
                "Result Saved Successfully"
            );


        } catch (error) {

            console.log(
                "Result submission error:",
                error
            );

        }


        // Remove timer

        localStorage.removeItem(
            "examStartTime"
        );


        setSubmitted(true);


        navigate("/result");

    }, [
        submitted,
        createResult,
        navigate
    ]);


    // ==========================================
    // AUTO SUBMIT
    // ==========================================

    const autoSubmit = useCallback(async () => {

        if (submitted) {

            return;

        }


        setTimeUp(true);


        const result =
            createResult();


        localStorage.setItem(
            "result",
            JSON.stringify(result)
        );


        try {

            await axios.post(

                `${API_URL}/api/submit`,

                result

            );


            console.log(
                "Auto Result Saved"
            );


        } catch (error) {

            console.log(
                "Auto submission error:",
                error
            );

        }


        localStorage.removeItem(
            "examStartTime"
        );


        setSubmitted(true);


        setShowSubmitModal(false);


        navigate("/result");

    }, [
        submitted,
        createResult,
        navigate
    ]);


    // ==========================================
    // TIMER EVENT
    // ==========================================

    useEffect(() => {

        if (timeUp) {

            return;

        }

        const handleTimeUp = () => {

            autoSubmit();

        };


        window.addEventListener(
            "examTimeUp",
            handleTimeUp
        );


        return () => {

            window.removeEventListener(
                "examTimeUp",
                handleTimeUp
            );

        };

    }, [autoSubmit, timeUp]);


    // ==========================================
    // SAFETY CHECK
    // ==========================================

    if (!student) {

        return (

            <div className="quiz-page">

                <div className="question-section">

                    Loading assessment...

                </div>

            </div>

        );

    }


    // ==========================================
    // RENDER
    // ==========================================

    return (

        <div className="quiz-page">


            {/* ==================================
                    HEADER
            ================================== */}

            <div className="quiz-header">

                <div>

                    <h2>

                        {selectedTestData.title}

                    </h2>


                    <p>

                        Candidate :

                        <strong>
                            {" "}
                            {student.name}
                        </strong>

                    </p>

                </div>


                {/* ==================================
                        TIMER
                ================================== */}

                <TimerWrapper
                    onTimeUp={autoSubmit}
                />

            </div>


            {/* ==================================
                    PROGRESS BAR
            ================================== */}

            <ProgressBarWrapper
                current={
                    currentQuestion + 1
                }
                total={totalQuestions}
            />


            {/* ==================================
                    MAIN CONTAINER
            ================================== */}

            <div className="quiz-container">


                {/* ==================================
                        LEFT PANEL
                ================================== */}

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


                    {/* ==================================
                            STATUS
                    ================================== */}

                    <div className="status-box">

                        <h4>
                            Progress
                        </h4>


                        <p>

                            Answered :

                            {" "}

                            {Object.keys(answers).length}

                            {" / "}

                            {totalQuestions}

                        </p>


                        <p>

                            Remaining :

                            {" "}

                            {
                                totalQuestions -
                                Object.keys(answers).length
                            }

                        </p>

                    </div>

                </div>


                {/* ==================================
                        CENTER QUESTION
                ================================== */}

                <div className="question-section">

                    <h3>

                        Question{" "}

                        {currentQuestion + 1}

                        {" / "}

                        {totalQuestions}

                    </h3>


                    <QuestionCardWrapper

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


                    {/* ==================================
                            NAVIGATION
                    ================================== */}

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


                {/* ==================================
                        RIGHT PANEL
                ================================== */}

                <div className="question-palette">

                    <h3>
                        Question Palette
                    </h3>


                    <div className="palette-grid">


                        {questions.map(
                            (question, index) => (

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


                    {/* ==================================
                            LEGEND
                    ================================== */}

                    <div className="palette-legend">


                        <div className="legend-item">

                            <span
                                className="legend current-box"
                            />

                            Current

                        </div>


                        <div className="legend-item">

                            <span
                                className="legend answered-box"
                            />

                            Answered

                        </div>


                        <div className="legend-item">

                            <span
                                className="legend unanswered-box"
                            />

                            Unanswered

                        </div>

                    </div>


                    {/* ==================================
                            SUBMIT
                    ================================== */}

                        <button
                            className="submit-btn"
                            onClick={() => setShowSubmitModal(true)}
                        >
                            Submit Assessment
                        </button>


                    {/* ==================================
                            SUBMIT MODAL
                    ================================== */}

                    {showSubmitModal && (

                        <div className="modal-overlay">


                            <div className="submit-modal">

                                <h2>
                                    Submit Assessment?
                                </h2>


                                <p>

                                    Are you sure you
                                    want to submit your
                                    assessment?

                                    <br />

                                    Once submitted,
                                    you cannot modify
                                    your answers.

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

                                        onClick={() => {

                                            setShowSubmitModal(
                                                false
                                            );

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


            {/* ==================================
                    FOOTER
            ================================== */}

            <footer className="footer">

                © 2026 EETIRP LTD. |
                Empowering Student Innovation

            </footer>

        </div>

    );

}


// ==========================================
// TIMER WRAPPER
// ==========================================

function TimerWrapper({ onTimeUp }) {

    const Timer =
        require("../components/Timer").default;

    return (

        <Timer
            onTimeUp={onTimeUp}
        />

    );

}


// ==========================================
// PROGRESS BAR WRAPPER
// ==========================================

function ProgressBarWrapper({
    current,
    total
}) {

    const ProgressBar =
        require("../components/ProgressBar").default;

    return (

        <ProgressBar
            current={current}
            total={total}
        />

    );

}


// ==========================================
// QUESTION CARD WRAPPER
// ==========================================

function QuestionCardWrapper({
    question,
    selected,
    onSelect
}) {

    const QuestionCard =
        require("../components/QuestionCard").default;

    return (

        <QuestionCard

            question={question}

            selected={selected}

            onSelect={onSelect}

        />

    );

}


export default Quiz;