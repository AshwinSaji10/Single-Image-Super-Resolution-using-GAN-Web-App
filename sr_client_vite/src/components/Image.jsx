import React, { useEffect, useState } from "react";
import axios from "axios";
import './Image.css'

// const sr_placeholder = "placeholder1.png";

function Image() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [downloadEnabled, setDownloadEnabled] = useState(false);

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  const fileUploadHandler = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    axios.post("http://127.0.0.1:5000/image", formData,{ responseType: 'json' })
      .then((response) => {
        // console.log('image : '+response.data.image)
        //const imageUrl = URL.createObjectURL(response.data.image);
        setProcessedImage(response.data.image);
        setDownloadEnabled(true);
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
      });
  };

  const downloadImageHandler = () => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = `data:image/jpeg;base64,${processedImage}`;
    link.setAttribute('download', 'processed_image.png');
    document.body.appendChild(link);
    link.click();
    // Remove the temporary anchor element
    document.body.removeChild(link);
  };

  return(
    <div className="Image-section">
        <input type="file" onChange={fileSelectedHandler} />
        <button onClick={fileUploadHandler}>Upload</button>
        {/* {processedImage && <img src={processedImage} alt="Processed" />} */}
        <div className="output-image">
          <img src={`data:image/jpeg;base64,${processedImage}`}  alt="Processed" />
          <button onClick={downloadImageHandler} disabled={!downloadEnabled}>Download</button>
        </div>
    </div>
  );
}

export default Image;
