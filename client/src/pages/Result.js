import React from "react";
import "../styles/result.css";

function Result() {

    const result = JSON.parse(localStorage.getItem("result"));

    if (!result) {
        return (
            <div style={{padding:"50px"}}>
                No Result Found
            </div>
        );
    }

    return (

        <div className="result-page">

            <div className="result-card">

                <h1>Assessment Completed 🎉</h1>

                <h2>{result.student.name}</h2>

                <p><strong>USN :</strong> {result.student.usn}</p>

                <p><strong>College :</strong> {result.student.college}</p>

                <p><strong>Branch :</strong> {result.student.branch}</p>

                <hr />

                <h2>Score : {result.score} / {result.total}</h2>

                <h3>{result.percentage}%</h3>

                <p>Submitted Successfully</p>

            </div>

        </div>

    );

}

export default Result;