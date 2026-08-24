import React from "react";
import "../styles/result.css";

function Result() {

    const result = JSON.parse(
        localStorage.getItem("result")
    );

    if (!result) {

        return (

            <div className="result-page">

                <div className="result-card">

                    <h1>
                        No Result Found
                    </h1>

                    <p>
                        Your assessment result could not be found.
                    </p>

                </div>

            </div>

        );

    }


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


    /* ==============================
          GET TEST TITLE
    ============================== */

    const assessmentName =
        result.testTitle ||
        testTitles[result.testName] ||
        "Mock Test";


    return (

        <div className="result-page">

            <div className="result-card">


                {/* =========================
                      COMPLETION MESSAGE
                ========================= */}

                <h1>
                    Congratulations!
                    <br />
                    Assessment Completed 🎉
                </h1>


                {/* =========================
                      STUDENT NAME
                ========================= */}

                <h2>
                    {result.student.name}
                </h2>


                {/* =========================
                      ASSESSMENT
                ========================= */}

                <p>

                    <strong>
                        Assessment :
                    </strong>

                    {" "}

                    {assessmentName}

                </p>


                {/* =========================
                      STUDENT DETAILS
                ========================= */}

                <p>

                    <strong>
                        USN :
                    </strong>

                    {" "}

                    {result.student.usn}

                </p>


                <p>

                    <strong>
                        College :
                    </strong>

                    {" "}

                    {result.student.college}

                </p>


                <p>

                    <strong>
                        Branch :
                    </strong>

                    {" "}

                    {result.student.branch}

                </p>


                <p>

                    <strong>
                        Semester :
                    </strong>

                    {" "}

                    {result.student.semester}

                </p>


                <hr />


                {/* =========================
                      SCORE
                ========================= */}

                <h2>

                    Score :

                    {" "}

                    {result.score}

                    {" / "}

                    {result.total}

                </h2>


                <h3>

                    {result.percentage}%

                </h3>


                <p>

                    Submitted Successfully ✅

                </p>


                {/* =========================
                    LEARNING SECTION
                ========================= */}

                <div className="learning-section">


                    <h3>
                        Continue Your Learning
                    </h3>


                    <p>

                        For more learning resources,
                        coding practice and interview
                        preparation, explore our platforms.

                    </p>


                    <div className="resource-links">


                        {/* =========================
                              EETIRP
                        ========================= */}

                        <a

                            href="https://eetirpltd.vercel.app"

                            target="_blank"

                            rel="noopener noreferrer"

                            className="resource-card"

                        >

                            <img

                                src="/eetirp-logo.png"

                                alt="EETIRP"

                            />

                            <span>
                                Visit EETIRP
                            </span>

                        </a>


                        {/* =========================
                              KAURAHUB
                        ========================= */}

                        <a

                            href="https://kaurahub.com"

                            target="_blank"

                            rel="noopener noreferrer"

                            className="resource-card"

                        >

                            <img

                                src="/kaurahub-logo.png"

                                alt="KAURAHUB"

                            />

                            <span>
                                Visit KAURAHUB
                            </span>

                        </a>


                    </div>

                </div>


            </div>

        </div>

    );

}


export default Result;