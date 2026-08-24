import React, {
    useState,
    useEffect,
    useCallback
} from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import API_URL from "../config";

import "../styles/admin.css";


function Admin() {

    const navigate = useNavigate();


    // =====================================
    // STATE
    // =====================================

    const [results, setResults] = useState([]);

    const [search, setSearch] = useState("");

    const [filterTest, setFilterTest] = useState("all");


    // =====================================
    // TEST NAMES
    // =====================================

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


    // =====================================
    // FETCH RESULTS
    // =====================================

    const fetchResults = useCallback(async () => {

        try {

            const res = await axios.get(
                `${API_URL}/api/results?test=${filterTest}`
            );

            setResults(res.data);

        } catch (err) {

            console.log(err);

            alert("Unable to fetch results");

        }

    }, [filterTest]);


    // =====================================
    // AUTH + FETCH
    // =====================================

    useEffect(() => {

        if (
            localStorage.getItem("adminLogin")
            !== "true"
        ) {

            navigate("/admin");

            return;

        }

        fetchResults();

    }, [fetchResults, navigate]);


    // =====================================
    // SEARCH FILTER
    // =====================================

    const filteredResults = results.filter((item) => {

        const name =
            item.student?.name
                ?.toLowerCase() || "";

        const usn =
            item.student?.usn
                ?.toLowerCase() || "";

        const searchValue =
            search.toLowerCase();

        return (
            name.includes(searchValue)
            ||
            usn.includes(searchValue)
        );

    });


    // =====================================
    // STATISTICS
    // =====================================

    const totalStudents =
        results.length;


    const averageScore =
        results.length > 0

            ? (

                results.reduce(
                    (total, item) =>
                        total + Number(item.score || 0),
                    0
                )

                /

                results.length

            ).toFixed(2)

            : "0.00";


    const highestScore =
        results.length > 0

            ? Math.max(
                ...results.map(
                    item => Number(item.score || 0)
                )
            )

            : 0;


    // =====================================
    // TEST COUNTS
    // =====================================

    const testCounts = {};

    Object.keys(testNames).forEach((test) => {

        testCounts[test] =
            results.filter(
                item =>
                    item.testName === test
            ).length;

    });


    // =====================================
    // PERCENTAGE BADGE
    // =====================================

    const badgeClass = (percentage) => {

        const value =
            Number(percentage || 0);

        if (value >= 80) {

            return "badge excellent";

        }

        if (value >= 60) {

            return "badge good";

        }

        if (value >= 40) {

            return "badge average";

        }

        return "badge poor";

    };


    // =====================================
    // DOWNLOAD EXCEL
    // =====================================

    const downloadExcel = () => {

        window.open(

            `${API_URL}/api/export?test=${filterTest}`,

            "_blank"

        );

    };


    // =====================================
    // LOGOUT
    // =====================================

    const logout = () => {

        localStorage.removeItem(
            "adminLogin"
        );

        navigate("/admin");

    };


    // =====================================
    // UI
    // =====================================

    return (

        <div className="admin-page">


            {/* =================================
                    HEADER
            ================================= */}

            <h1>
                EETIRP Assessment Dashboard
            </h1>


            {/* =================================
                    STATISTICS
            ================================= */}

            <div className="cards">


                <div className="card">

                    <h2>
                        {totalStudents}
                    </h2>

                    <p>
                        Total Submissions
                    </p>

                </div>


                <div className="card">

                    <h2>
                        {highestScore}
                    </h2>

                    <p>
                        Highest Score
                    </p>

                </div>


                <div className="card">

                    <h2>
                        {averageScore}
                    </h2>

                    <p>
                        Average Score
                    </p>

                </div>


                <div className="card">

                    <h2>
                        12
                    </h2>

                    <p>
                        Total Tests
                    </p>

                </div>


            </div>


            {/* =================================
                    TOOLBAR
            ================================= */}

            <div className="toolbar">


                {/* SEARCH */}

                <input

                    type="text"

                    placeholder="Search by Name / USN"

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                />


                {/* TEST FILTER */}

                <select

                    value={filterTest}

                    onChange={(e) =>
                        setFilterTest(e.target.value)
                    }

                >

                    <option value="all">
                        All Tests
                    </option>


                    {Object.entries(testNames).map(
                        ([key, name]) => (

                            <option
                                key={key}
                                value={key}
                            >

                                {key.toUpperCase()}
                                {" - "}
                                {name}

                            </option>

                        )
                    )}

                </select>


                {/* DOWNLOAD */}

                <button
                    onClick={downloadExcel}
                >

                    Download Excel

                </button>


                {/* LOGOUT */}

                <button

                    className="logout-btn"

                    onClick={logout}

                >

                    Logout

                </button>


            </div>


            {/* =================================
                    SELECTED TEST INFORMATION
            ================================= */}

            <div
                className="selected-test-info"
            >

                <strong>
                    Showing:
                </strong>

                {" "}

                {filterTest === "all"

                    ? "All Assessment Results"

                    : testNames[filterTest]

                }

                {" "}

                <span>
                    ({filteredResults.length} records)
                </span>

            </div>


            {/* =================================
                    TEST COUNTS
            ================================= */}

            <div className="test-summary">

                {Object.entries(testNames).map(
                    ([key, name]) => (

                        <div
                            className="test-summary-card"
                            key={key}
                        >

                            <span>
                                {key.toUpperCase()}
                            </span>

                            <strong>
                                {testCounts[key]}
                            </strong>

                            <p>
                                {name}
                            </p>

                        </div>

                    )
                )}

            </div>


            {/* =================================
                    RESULTS TABLE
            ================================= */}

            <div className="table-container">

                <table>

                    <thead>

                        <tr>

                            <th>
                                #
                            </th>

                            <th>
                                Name
                            </th>

                            <th>
                                USN
                            </th>

                            <th>
                                Test
                            </th>

                            <th>
                                College
                            </th>

                            <th>
                                Branch
                            </th>

                            <th>
                                Semester
                            </th>

                            <th>
                                Score
                            </th>

                            <th>
                                Percentage
                            </th>

                            <th>
                                Submitted At
                            </th>

                        </tr>

                    </thead>


                    <tbody>


                        {filteredResults.length > 0 ? (

                            filteredResults.map(
                                (item, index) => (

                                    <tr
                                        key={
                                            item._id ||
                                            index
                                        }
                                    >

                                        <td>
                                            {index + 1}
                                        </td>


                                        <td>
                                            {
                                                item.student?.name
                                                || "-"
                                            }
                                        </td>


                                        <td>
                                            {
                                                item.student?.usn
                                                || "-"
                                            }
                                        </td>


                                        <td>

                                            <span className="test-badge">

                                                {
                                                    item.testName
                                                        ?.toUpperCase()
                                                        || "-"
                                                }

                                            </span>

                                            <small>

                                                {
                                                    item.testTitle
                                                    ||
                                                    testNames[
                                                        item.testName
                                                    ]
                                                    ||
                                                    "Assessment"
                                                }

                                            </small>

                                        </td>


                                        <td>
                                            {
                                                item.student?.college
                                                || "-"
                                            }
                                        </td>


                                        <td>
                                            {
                                                item.student?.branch
                                                || "-"
                                            }
                                        </td>


                                        <td>
                                            {
                                                item.student?.semester
                                                || "-"
                                            }
                                        </td>


                                        <td>

                                            <strong>
                                                {
                                                    item.score
                                                }
                                                /
                                                {
                                                    item.total
                                                }
                                            </strong>

                                        </td>


                                        <td>

                                            <span
                                                className={
                                                    badgeClass(
                                                        item.percentage
                                                    )
                                                }
                                            >

                                                {
                                                    item.percentage
                                                }%

                                            </span>

                                        </td>


                                        <td>

                                            {
                                                item.submittedAt
                                                || "-"
                                            }

                                        </td>


                                    </tr>

                                )

                            )

                        ) : (

                            <tr>

                                <td
                                    colSpan="10"
                                    style={{
                                        textAlign:
                                            "center",
                                        padding:
                                            "50px",
                                        color:
                                            "#64748b"
                                    }}
                                >

                                    No assessment
                                    records found.

                                </td>

                            </tr>

                        )}


                    </tbody>

                </table>

            </div>


            {/* =================================
                    FOOTER
            ================================= */}

            <footer className="admin-footer">

                © 2026 EETIRP LTD.
                {" | "}
                Empowering Student Innovation

            </footer>


        </div>

    );

}


export default Admin;