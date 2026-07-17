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

    useEffect(() => {

        const data = JSON.parse(localStorage.getItem("student"));

        if (!data) {
            navigate("/");
        }

        setStudent(data);

    }, [navigate]);

    const startExam = () => {

        if (!agree) {
            alert("Please accept the instructions.");
            return;
        }

        if (!localStorage.getItem("examStartTime")) {
         localStorage.setItem("examStartTime", Date.now().toString());
         }
        navigate("/quiz");

    };

    return (

        <div className="instruction-page">

            <div className="instruction-card">

                <img
                    src="/logo.png"
                    className="logo"
                    alt="logo"
                />

                <h1>HCLTech Mock Test</h1>

                <p className="subtitle">
                    Please verify your details before starting the examination.
                </p>

                <div className="candidate-card">

                    <h3>
                        <FaUserGraduate />
                        Candidate Details
                    </h3>

                    <div className="detail-row">
                        <span>Name</span>
                        <span>{student.name}</span>
                    </div>

                    <div className="detail-row">
                        <span>USN / URN</span>
                        <span>{student.usn}</span>
                    </div>

                    <div className="detail-row">
                        <span>College</span>
                        <span>{student.college}</span>
                    </div>

                    <div className="detail-row">
                        <span>Branch</span>
                        <span>{student.branch}</span>
                    </div>

                    <div className="detail-row">
                        <span>Semester</span>
                        <span>{student.semester}</span>
                    </div>

                </div>

                <div className="exam-info">

                    <div className="info-box">
                        <FaBook />
                        <h2>30</h2>
                        <p>Questions</p>
                    </div>

                    <div className="info-box">
                        <FaClock />
                        <h2>15 Min</h2>
                        <p>Duration</p>
                    </div>

                    <div className="info-box">
                        <FaCheckCircle />
                        <h2>30</h2>
                        <p>Total Marks</p>
                    </div>

                </div>

                <div className="rules">

                    <h3>Instructions</h3>

                    <ul>
                        <li>Read every question carefully before answering.</li>
                        <li>Each question carries 1 mark.</li>
                        <li>No negative marking.</li>
                        <li>You can move using Previous and Next buttons.</li>
                        <li>You can jump to any question using the question palette.</li>
                        <li>Test will auto-submit after 15 minutes.</li>
                        <li>Click Submit once you finish.</li>
                    </ul>

                </div>

                <div className="checkbox">

                    <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e)=>setAgree(e.target.checked)}
                    />

                    <label>
                        I have read and understood all the instructions.
                    </label>

                </div>

                <button
                    onClick={startExam}
                    disabled={!agree}
                    className={!agree ? "disabled-btn" : ""}
                >
                    Start Test
                </button>

            </div>
<footer className="footer">
    © 2026 EETIRP LTD. | Empowering Student Innovation
</footer>
        </div>

    );
}

export default Instructions;