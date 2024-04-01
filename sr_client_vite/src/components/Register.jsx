import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() 
{
    // const [showModal, setShowModal] = useState(false);

    // const closeModal = () => {
    //     setShowModal(false); // Close modal
    // };
    const [notification, setNotification] = useState(null);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://127.0.0.1:5000/register", formData)
            .then((response) => {
                console.log(response.data);
                // setShowModal(true);
                setNotification({ type: "success", message: "Registration successful!" });
                setTimeout(() => {
                    setNotification(null);
                }, 2000);
                //console.log("success");
            })
            .catch((error) => {
                setNotification({ type: "error", message: "Registration failed. Username already exists!" });
                setTimeout(() => {
                    setNotification(null);
                }, 2000);
                console.error("Error:", error);
                // Handle error (e.g., show an error message)
            });
    };

    return (
        <div className="register">
            <form className="form-container" onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div className="input-field">
                    <label>Enter your email address</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Eg: abc@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-field">
                    <label>Enter your password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="********"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className="register-btn"id="sub_btn" type="submit">
                    Register
                </button>
                <Link to="/" className="login-link">
                    <label className="right-label">
                        Already have an account? Login here
                    </label>
                </Link>
            </form>
            {/* {showModal && ( // Conditionally render modal based on showModal state
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                        <h2>Registration Successful</h2>
                        <p>You have successfully registered!</p>
                    </div>
                </div>
            )} */}
            {notification && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
        </div>
    );
}

export default Register;
