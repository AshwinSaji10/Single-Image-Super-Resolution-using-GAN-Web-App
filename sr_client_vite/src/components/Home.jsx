import "./Home.css";
import Image from "./Image";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import Storage from "./Storage";

function Home() {
    const navigate = useNavigate();

    const [currentComponent, setCurrentComponent] = useState(null);

    const handleLogout = async () => {
        try {
            await axios.get("/logout");
            // Redirect to the login page
            navigate("/", { replace: true });
        } catch (error) {
            console.error("Logout error:", error);
            // Handle logout error
        }
    };

    const handleComponentChange = (component) => {
        setCurrentComponent(component);
    };
    return (
        <div className="home-page">
            <div className="sidebar-container">
                {/* <h1>hello</h1> */}
                <Sidebar handleComponentChange={handleComponentChange} />
            </div>
            <div className="app-container">
                <div className="app-header">
                    <h1>Single Image Super Resolution using GAN</h1>
                    <button onClick={handleLogout}>Logout</button>
                </div>
                {currentComponent === "view" ? <Storage/> : <Image/>}
            </div>
        </div>
    );
}

export default Home;
