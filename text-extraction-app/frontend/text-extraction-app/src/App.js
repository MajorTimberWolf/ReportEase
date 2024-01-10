import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/extract",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            // You can use this callback to handle the progress
          },
        }
      );

      setResult(response.data.result);
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    }
    setUploading(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Text Extraction</h1>
      <div className="mb-3">
        <input
          type="file"
          accept=".pdf, .png, .jpg, .jpeg"
          className="form-control"
          onChange={handleFileChange}
        />
      </div>
      <div className="d-grid gap-2">
        <button
          className="btn btn-primary btn-lg"
          type="button"
          onClick={handleUpload}
          disabled={uploading}
        >
          Upload File
        </button>
        {uploading && (
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated bg-success"
              role="progressbar"
              style={{ width: "100%" }}
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        )}
      </div>
      {result && (
        <div className="card w-100 mt-4">
          <div className="card-body">
            <h2 className="card-title">Extracted Text:</h2>
            <div className="overflow-auto" style={{ maxHeight: "400px" }}>
              <pre className="card-text">{result}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;