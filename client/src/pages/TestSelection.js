import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/testselection.css";

function TestSelection() {

    const navigate = useNavigate();

    const startTest = (test) => {

        localStorage.setItem("selectedTest", test);

        // Start fresh exam session
        localStorage.removeItem("examStartTime");
        localStorage.removeItem("result");

        navigate("/instructions");

    };

    const tests = [

        {
            id: "test1",
            title: "Test 1",
            topic: "Java Basics 1",
            questions: 20,
            duration: "15 Minutes"
        },

        {
            id: "test2",
            title: "Test 2",
            topic: "Java Fundamentals 1",
            questions: 20,
            duration: "15 Minutes"
        },

        {
            id: "test3",
            title: "Test 3",
            topic: "AI & Data Science",
            questions: 20,
            duration: "15 Minutes"
        },

        {
            id: "test4",
            title: "Test 4",
            topic: "Python & Data Science",
            questions: 20,
            duration: "15 Minutes"
        },

        {
            id: "test5",
            title: "Test 5",
            topic: "Statistics & Machine Learning",
            questions: 20,
            duration: "15 Minutes"
        },

        {
            id: "test6",
            title: "Test 6",
            topic: "Machine Learning & AI",
            questions: 20,
            duration: "15 Minutes"
        },

        {
            id: "test7",
            title: "Test 7",
            topic: "Full Stack Web Development",
            questions: 20,
            duration: "15 Minutes"
        },

        {
            id: "test8",
            title: "Test 8",
            topic: "React & JavaScript",
            questions: 20,
            duration: "15 Minutes"
        },

        {
            id: "test9",
            title: "Test 9",
            topic: "Web APIs & Databases",
            questions: 20,
            duration: "15 Minutes"
        },

        {
            id: "test10",
            title: "Test 10",
            topic: "Generative AI & LLMs",
            questions: 20,
            duration: "15 Minutes"
        },

        {
            id: "test11",
            title: "Test 11",
            topic: "RAG, Embeddings & AI Systems",
            questions: 20,
            duration: "15 Minutes"
        },

        {
            id: "test12",
            title: "Test 12",
            topic: "Coding, Debugging & Aptitude",
            questions: 20,
            duration: "15 Minutes"
        }

    ];

    return (

        <div className="selection-page">

            <div className="selection-container">

                <img
                    src="/logo.png"
                    alt="EETIRP Logo"
                    className="selection-logo"
                />

                <h1>Select Assessment</h1>

                <p>
                    Choose the assessment you want to attempt.
                </p>

                <div className="test-grid">

                    {tests.map((test) => (

                        <div
                            className="test-card"
                            key={test.id}
                        >

                            <h2>
                                {test.title}
                            </h2>

                            <p>
                                {test.topic}
                            </p>

                            <div className="test-info">

                                <span>
                                    {test.questions} Questions
                                </span>

                                <span>
                                    {test.duration}
                                </span>

                            </div>

                            <button
                                onClick={() =>
                                    startTest(test.id)
                                }
                            >
                                Start Test
                            </button>

                        </div>

                    ))}

                </div>

            </div>

            <footer className="footer">

                © 2026 EETIRP LTD. |
                Empowering Student Innovation

            </footer>

        </div>

    );

}

export default TestSelection;