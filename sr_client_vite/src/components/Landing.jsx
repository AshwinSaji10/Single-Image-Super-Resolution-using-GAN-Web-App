import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Landing.css";

function Landing({ setAuthenticated }) 
{
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/login",
                formData
            );
            console.log(response.data);
            // Redirect to home page or do something else on successful login
            setAuthenticated(true);
            navigate("/home");
        } catch (error) {
            console.error("Error:", error);
            // Handle login failure (show error message, clear form, etc.)
        }
    };

    return (
        <div className="Landing">
            <div className="carousel-container">
                <h1>Single Image Super Resolution using GAN</h1>
            </div>
            <form className="formbox-container" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button id="sub_btn" type="submit">
                    Login
                </button>
                <div className="links">
                    {/* <Link to="/forget-password">
                        <label className="right-label">Forget password?</label>
                    </Link> */}
                    <Link to="/register">
                        <label className="right-label">
                            New User? Register
                        </label>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Landing;
