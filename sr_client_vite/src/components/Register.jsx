import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:5000/register", formData)
      .then(response => {
        console.log(response.data);
        //console.log("success");
      })
      .catch(error => {
        console.error("Error:", error);
        // Handle error (e.g., show an error message)
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label>Enter your email address</label>
          <br />
          <input type="text" name="email" value={formData.email} onChange={handleChange} required />
        </p>
        <p>
          <label>Enter your Password</label>
          <br />
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </p>
        <p>
          <button id="sub_btn" type="submit">Register</button>
        </p>
      </form>
    </div>
  );
}

export default Register;
