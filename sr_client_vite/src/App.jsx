// import React, { useEffect, useState } from "react";
// import axios from "axios";
import "./App.css";
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Landing from "/src/components/Landing";
import Home from "/src/components/Home";
import Register from "/src/components/Register";
import ForgetPassword from "/src/components/ForgetPassword";

function App() {
  // const [message, setMessage] = useState("");
  // const [selectedFile, setSelectedFile] = useState(null);

  // const fileSelectedHandler = event => {
  //     setSelectedFile(event.target.files[0]);
  // };

  // // useEffect(() => {
  // //   axios
  // //     .get("http://localhost:5000/")
  // //     .then((response) => {
  // //       setMessage(response.data.message);
  // //     })
  // //     .catch((error) => {
  // //       console.error("Error fetching data:", error);
  // //     });
  // // }, []);

  // const fileUploadHandler = () => {
  //   const formData = new FormData();
  //   formData.append('file', selectedFile);
  //   axios.post("http://localhost:5000/", formData)
  //       .then(response => {
  //           console.log(response.data);
  //       })
  //       .catch(error => {
  //           console.error('Error uploading file: ', error);
  //       });
  //   };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forget-password" element={<ForgetPassword/>} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
