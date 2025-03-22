import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:3001/signup", { email, password });
        console.log(response.data);
        alert(response.data.message);
        navigate("/login");
    } catch (error) {
        if (error.response) {
            alert(error.response.data.error || "Signup failed");
        } else {
            alert("Server is not responding. Please try again later.");
        }
    }
};


    return (
        <div className="container">
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <button type="submit">Signup</button>
            </form>
        </div>
    );
    
};

export default Signup;
