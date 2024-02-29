// import React, { useEffect, useState } from "react";
// import axios from "axios";
import "./App.css";
import Image from '/src/components/Image';

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
    <div className="App">
        <div className="App-header">
          <h1>Single Image Super Resolution using GAN</h1>
          <Image/>
        </div>
    </div>
  );
}

export default App;
