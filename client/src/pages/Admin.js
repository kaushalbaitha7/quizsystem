import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/admin.css";

function Admin() {
      const navigate = useNavigate();

       useEffect(() => {

        if(localStorage.getItem("adminLogin") !== "true"){

        navigate("/admin");

        return;

    }

    fetchResults();

    }, []);
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {

        try{

            const res = await axios.get(
                "http://localhost:5000/api/results"
            );

            setResults(res.data);

        }catch(err){

            console.log(err);

        }

    };

    const filteredResults = results.filter((item)=>

        item.student.name
        .toLowerCase()
        .includes(search.toLowerCase())

        ||

        item.student.usn
        .toLowerCase()
        .includes(search.toLowerCase())

    );

    const totalStudents = results.length;

    const highestScore =
        results.length > 0
            ? Math.max(...results.map(r=>r.score))
            : 0;

    const averageScore =
        results.length > 0
            ? (
                results.reduce((a,b)=>a+b.score,0)
                /
                results.length
            ).toFixed(2)
            : 0;

    return(

        <div className="admin-page">

            <h1>
                EETIRP Assessment Dashboard
            </h1>

            <div className="cards">

                <div className="card">
                    <h2>{totalStudents}</h2>
                    <p>Total Students</p>
                </div>

                <div className="card">
                    <h2>{highestScore}</h2>
                    <p>Highest Score</p>
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

                    onChange={(e)=>setSearch(e.target.value)}

                />

                <button

                    onClick={()=>{

                        window.open(
                            "http://localhost:5000/api/export",
                            "_blank"
                        );

                    }}

                >

                    Download Excel

                </button>

            </div>
            <button
            className="logout-btn"
            onClick={()=>{
                localStorage.removeItem("adminLogin");
                navigate("/admin");
            }}
            >
            Logout
            </button>
            <table>

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>USN</th>

                        <th>College</th>

                        <th>Branch</th>

                        <th>Sem</th>

                        <th>Score</th>

                        <th>%</th>

                        <th>Date</th>

                    </tr>

                </thead>

                <tbody>

                {

                    filteredResults.map((item,index)=>(

                        <tr key={index}>

                            <td>{item.student.name}</td>

                            <td>{item.student.usn}</td>

                            <td>{item.student.college}</td>

                            <td>{item.student.branch}</td>

                            <td>{item.student.semester}</td>

                            <td>{item.score}/{item.total}</td>

                            <td>{item.percentage}%</td>

                            <td>{item.submittedAt}</td>

                        </tr>

                    ))

                }

                </tbody>

            </table>

        </div>

    );

}

export default Admin;