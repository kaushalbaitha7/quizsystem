import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminlogin.css";

function AdminLogin() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {

        if(username === "admin" && password === "admin123"){

            localStorage.setItem("adminLogin","true");

            navigate("/dashboard");

        }else{

            alert("Invalid Username or Password");

        }

    };

    return (

        <div className="admin-login-page">

            <div className="login-card">

                <img
                    src="/logo.png"
                    alt="logo"
                    className="login-logo"
                />

                <h2>Administrator Login</h2>

                <p>EETIRP Assessment Portal</p>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <button onClick={login}>
                    Login
                </button>

            </div>

        </div>

    );

}

export default AdminLogin;