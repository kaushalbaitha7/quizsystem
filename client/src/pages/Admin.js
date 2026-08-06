import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";
import "../styles/admin.css";

function Admin() {

    const navigate = useNavigate();

    const [results, setResults] = useState([]);
    const [search, setSearch] = useState("");
    const [filterTest, setFilterTest] = useState("all");

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

    useEffect(() => {

        if (localStorage.getItem("adminLogin") !== "true") {

            navigate("/admin");
            return;

        }

        fetchResults();

    }, [fetchResults, navigate]);

    const filteredResults = results.filter((item) => {

        return (

            item.student.name
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            item.student.usn
                .toLowerCase()
                .includes(search.toLowerCase())

        );

    });

    const totalStudents = results.length;

    const test1Count =
        results.filter(
            (item) => item.testName === "test1"
        ).length;

    const test2Count =
        results.filter(
            (item) => item.testName === "test2"
        ).length;

    const averageScore =
        results.length > 0
            ? (
                results.reduce((a, b) => a + b.score, 0)
                / results.length
            ).toFixed(2)
            : 0;

    const badgeClass = (percentage) => {

        const value = Number(percentage);

        if (value >= 80) return "badge excellent";

        if (value >= 60) return "badge good";

        if (value >= 40) return "badge average";

        return "badge poor";

    };

    return (

        <div className="admin-page">

            <h1>EETIRP Assessment Dashboard</h1>

            <div className="cards">

                <div className="card">
                    <h2>{totalStudents}</h2>
                    <p>Total Students</p>
                </div>

                <div className="card">
                    <h2>{test1Count}</h2>
                    <p>Mock Test 1</p>
                </div>

                <div className="card">
                    <h2>{test2Count}</h2>
                    <p>Mock Test 2</p>
                </div>

                <div className="card">
                    <h2>{averageScore}</h2>
                    <p>Average Score</p>
                </div>

            </div>

            <div className="toolbar">

                <input
                    placeholder="Search by Name / USN"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={filterTest}
                    onChange={(e) => setFilterTest(e.target.value)}
                >

                    <option value="all">
                        All Tests
                    </option>

                    <option value="test1">
                        Mock Test 1
                    </option>

                    <option value="test2">
                        Mock Test 2
                    </option>

                </select>

                <button
                    onClick={() =>
                        window.open(
                            `${API_URL}/api/export?test=${filterTest}`,
                            "_blank"
                        )
                    }
                >
                    Download Excel
                </button>

                <button
                    className="logout-btn"
                    onClick={() => {

                        localStorage.removeItem("adminLogin");

                        navigate("/admin");

                    }}
                >
                    Logout
                </button>

            </div>

                   <table>

                <thead>

                    <tr>

                        <th>Name</th>
                        <th>USN</th>
                        <th>Test</th>
                        <th>College</th>
                        <th>Branch</th>
                        <th>Semester</th>
                        <th>Score</th>
                        <th>Percentage</th>
                        <th>Submitted At</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filteredResults.length > 0 ? (

                            filteredResults.map((item, index) => (

                                <tr key={index}>

                                    <td>{item.student.name}</td>

                                    <td>{item.student.usn}</td>

                                    <td>

                                        {
                                            item.testName === "test2"
                                                ? "Mock Test 2"
                                                : "Mock Test 1"
                                        }

                                    </td>

                                    <td>{item.student.college}</td>

                                    <td>{item.student.branch}</td>

                                    <td>{item.student.semester}</td>

                                    <td>

                                        {item.score}/{item.total}

                                    </td>

                                    <td>

                                        <span
                                            className={badgeClass(item.percentage)}
                                        >

                                            {item.percentage}%

                                        </span>

                                    </td>

                                    <td>

                                        {item.submittedAt}

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="9"
                                    style={{
                                        textAlign: "center",
                                        padding: "40px",
                                        color: "#666"
                                    }}
                                >

                                    No records found.

                                </td>

                            </tr>

                        )

                    }

                </tbody>

            </table>

        </div>

    );

}

export default Admin;     