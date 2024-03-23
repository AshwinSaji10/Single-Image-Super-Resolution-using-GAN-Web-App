import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Landing.css';

function Landing() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', formData);
            console.log(response.data);
            // Redirect to home page or do something else on successful login
            navigate('/home');
        } catch (error) {
            console.error('Error:', error);
            // Handle login failure (show error message, clear form, etc.)
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>Username or email address</label>
                    <br />
                    <input type="text" name="email" value={formData.email} onChange={handleChange} required />
                </p>
                <p>
                    <label>Password</label>
                    <br />
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Login</button>
                </p>
            </form>
            <div className="links">
                <Link to="/forget-password">
                    <label className="right-label">Forget password?</label>
                </Link>
                <Link to="/register">
                    <label className="right-label">New User? Register</label>
                </Link>
            </div>
        </div>
    );
}

export default Landing;
