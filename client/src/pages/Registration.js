import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/registration.css";
import { FaUserGraduate, FaUniversity, FaCodeBranch } from "react-icons/fa";
import { MdBadge, MdSchool } from "react-icons/md";

function Registration() {

    const navigate = useNavigate();

    const [student, setStudent] = useState({
        name: "",
        usn: "",
        college: "",
        branch: "",
        semester: ""
    });

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    };

    const startAssessment = () => {

        if (
            !student.name ||
            !student.usn ||
            !student.college ||
            !student.branch ||
            !student.semester
        ) {
            alert("Please fill all the details.");
            return;
        }

        localStorage.setItem("student", JSON.stringify(student));

        navigate("/instructions");
    };

    return (
        <div className="registration-page">

            <div className="registration-card">

                <img
                    src="/logo.png"
                    alt="Logo"
                    className="logo"
                />

                <h1>Mock Test</h1>

                <p className="subtitle">
                    Online MCQ Examination Portal
                </p>

                <div className="input-box">
                    <FaUserGraduate />
                    <input
                        type="text"
                        placeholder="Student Name"
                        name="name"
                        onChange={handleChange}
                    />
                </div>

                <div className="input-box">
                    <MdBadge />
                    <input
                        type="text"
                        placeholder="USN / URN"
                        name="usn"
                        onChange={handleChange}
                    />
                </div>

                <div className="input-box">
                    <FaUniversity />
                    <input
                        type="text"
                        placeholder="College / University"
                        name="college"
                        onChange={handleChange}
                    />
                </div>

                <div className="input-box">
                    <FaCodeBranch />
                    <input
                        type="text"
                        placeholder="Branch"
                        name="branch"
                        onChange={handleChange}
                    />
                </div>

                <div className="input-box">
                    <MdSchool />
                    <select
                        name="semester"
                        onChange={handleChange}
                    >
                        <option value="">Select Semester</option>

                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>

                    </select>
                </div>

                <button onClick={startAssessment}>
                    Start Assessment
                </button>

            </div>

            <footer className="footer">
    © 2026 EETIRP LTD. | Empowering Student Innovation
</footer>

        </div>
    );
}

export default Registration;