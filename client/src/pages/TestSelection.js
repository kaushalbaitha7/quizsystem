import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/testselection.css";

function TestSelection() {

    const navigate = useNavigate();

    const startTest = (test) => {

        localStorage.setItem("selectedTest", test);

        navigate("/instructions");

    };

    return (

        <div className="selection-page">

            <div className="selection-container">

                <img
                    src="/logo.png"
                    alt="logo"
                    className="selection-logo"
                />

                <h1>Select Assessment</h1>

                <p>
                    Choose the assessment you want to attempt.
                </p>

                <div className="test-grid">

                    <div className="test-card">

                        <h2>Test 1</h2>

                        <p>Java Basics 1</p>

                        <div className="test-info">

                            <span>20 Questions</span>

                            <span>15 Minutes</span>

                        </div>

                        <button
                            onClick={() => startTest("test1")}
                        >
                            Start Test
                        </button>

                    </div>

                    <div className="test-card">

                        <h2>Test 2</h2>

                        <p>Java Fundamentals 1</p>


                        <div className="test-info">

                            <span>20 Questions</span>

                            <span>15 Minutes</span>

                        </div>

                        <button
                            onClick={() => startTest("test2")}
                        >
                            Start Test
                        </button>

                    </div>

                    <div className="test-card disabled">

                        <h2>More Tests</h2>

                        <p>Coming Soon</p>

                        <span>Additional Assessments</span>

                        <button disabled>
                            Locked
                        </button>

                    </div>

                </div>

            </div>

            <footer className="footer">
                © 2026 EETIRP LTD. | Empowering Student Innovation
            </footer>

        </div>

    );

}

export default TestSelection;