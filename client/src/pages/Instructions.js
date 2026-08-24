import React, { useEffect, useState } from "react";
import "../styles/instructions.css";
import { useNavigate } from "react-router-dom";

import {
    FaClock,
    FaBook,
    FaCheckCircle,
    FaUserGraduate
} from "react-icons/fa";


function Instructions() {

    const navigate = useNavigate();

    const [student, setStudent] = useState({});
    const [agree, setAgree] = useState(false);

    const selectedTest =
        localStorage.getItem("selectedTest");


    /* ==============================
          TEST DETAILS
    ============================== */

    const testDetails = {

        test1: {
            title: "Java Basics 1",
            questions: 20,
            duration: "15 Min",
            marks: 20
        },

        test2: {
            title: "Java Fundamentals 1",
            questions: 20,
            duration: "15 Min",
            marks: 20
        },

        test3: {
            title: "AI & Data Science",
            questions: 20,
            duration: "15 Min",
            marks: 20
        },

        test4: {
            title: "Python & Data Science",
            questions: 20,
            duration: "15 Min",
            marks: 20
        },

        test5: {
            title: "Statistics & Machine Learning",
            questions: 20,
            duration: "15 Min",
            marks: 20
        },

        test6: {
            title: "Machine Learning & AI",
            questions: 20,
            duration: "15 Min",
            marks: 20
        },

        test7: {
            title: "Full Stack Web Development",
            questions: 20,
            duration: "15 Min",
            marks: 20
        },

        test8: {
            title: "React & JavaScript",
            questions: 20,
            duration: "15 Min",
            marks: 20
        },

        test9: {
            title: "Web APIs & Databases",
            questions: 20,
            duration: "15 Min",
            marks: 20
        },

        test10: {
            title: "Generative AI & LLMs",
            questions: 20,
            duration: "15 Min",
            marks: 20
        },

        test11: {
            title: "RAG, Embeddings & AI Systems",
            questions: 20,
            duration: "15 Min",
            marks: 20
        },

        test12: {
            title: "Coding, Debugging & Aptitude",
            questions: 20,
            duration: "15 Min",
            marks: 20
        }

    };


    /* ==============================
          CHECK SELECTED TEST
    ============================== */

    const currentTest =
        testDetails[selectedTest];


    /* ==============================
          LOAD STUDENT
    ============================== */

    useEffect(() => {

        const data =
            JSON.parse(
                localStorage.getItem("student")
            );


        if (!data) {

            navigate("/");

            return;

        }


        if (
            !selectedTest ||
            !testDetails[selectedTest]
        ) {

            navigate("/tests");

            return;

        }


        setStudent(data);

    }, [navigate, selectedTest]);


    /* ==============================
          START EXAM
    ============================== */

    const startExam = () => {

        if (!agree) {

            alert(
                "Please accept the instructions."
            );

            return;

        }


        /*
         * Always start a fresh timer
         * when a new test is opened.
         */

        localStorage.setItem(
            "examStartTime",
            Date.now().toString()
        );


        navigate("/quiz");

    };


    /* ==============================
          SAFETY CHECK
    ============================== */

    if (!currentTest) {

        return null;

    }


    return (

        <div className="instruction-page">


            {/* =========================
                    MAIN CARD
            ========================= */}

            <div className="instruction-card">


                {/* LOGO */}

                <img

                    src="/logo.png"

                    className="logo"

                    alt="EETIRP Logo"

                />


                {/* TITLE */}

                <h1>
                    {currentTest.title}
                </h1>


                <p className="subtitle">

                    Please verify your details
                    before starting the examination.

                </p>


                {/* =========================
                    CANDIDATE DETAILS
                ========================= */}

                <div className="candidate-card">


                    <h3>

                        <FaUserGraduate />

                        Candidate Details

                    </h3>


                    <div className="detail-row">

                        <span>
                            Name
                        </span>

                        <span>
                            {student.name}
                        </span>

                    </div>


                    <div className="detail-row">

                        <span>
                            USN / URN
                        </span>

                        <span>
                            {student.usn}
                        </span>

                    </div>


                    <div className="detail-row">

                        <span>
                            College
                        </span>

                        <span>
                            {student.college}
                        </span>

                    </div>


                    <div className="detail-row">

                        <span>
                            Branch
                        </span>

                        <span>
                            {student.branch}
                        </span>

                    </div>


                    <div className="detail-row">

                        <span>
                            Semester
                        </span>

                        <span>
                            {student.semester}
                        </span>

                    </div>


                </div>


                {/* =========================
                       EXAM INFORMATION
                ========================= */}

                <div className="exam-info">


                    {/* QUESTIONS */}

                    <div className="info-box">

                        <FaBook />

                        <h2>
                            {currentTest.questions}
                        </h2>

                        <p>
                            Questions
                        </p>

                    </div>


                    {/* DURATION */}

                    <div className="info-box">

                        <FaClock />

                        <h2>
                            {currentTest.duration}
                        </h2>

                        <p>
                            Duration
                        </p>

                    </div>


                    {/* MARKS */}

                    <div className="info-box">

                        <FaCheckCircle />

                        <h2>
                            {currentTest.marks}
                        </h2>

                        <p>
                            Total Marks
                        </p>

                    </div>


                </div>


                {/* =========================
                         RULES
                ========================= */}

                <div className="rules">


                    <h3>
                        Instructions
                    </h3>


                    <ul>

                        <li>
                            Read every question
                            carefully before answering.
                        </li>

                        <li>
                            Each question carries
                            1 mark.
                        </li>

                        <li>
                            No negative marking.
                        </li>

                        <li>
                            You can move using
                            Previous and Next buttons.
                        </li>

                        <li>
                            You can jump to any
                            question using the
                            question palette.
                        </li>

                        <li>
                            Test will auto-submit
                            after {currentTest.duration}.
                        </li>

                        <li>
                            Make sure all questions
                            are answered before
                            submitting.
                        </li>

                        <li>
                            Once submitted, your
                            answers cannot be changed.
                        </li>

                    </ul>


                </div>


                {/* =========================
                      AGREEMENT CHECKBOX
                ========================= */}

                <div className="checkbox">


                    <input

                        type="checkbox"

                        checked={agree}

                        onChange={(e) =>
                            setAgree(
                                e.target.checked
                            )
                        }

                    />


                    <label>

                        I have read and understood
                        all the instructions.

                    </label>


                </div>


                {/* =========================
                         START BUTTON
                ========================= */}

                <button

                    onClick={startExam}

                    disabled={!agree}

                    className={
                        !agree
                            ? "disabled-btn"
                            : ""
                    }

                >

                    Start Test

                </button>


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


export default Instructions;