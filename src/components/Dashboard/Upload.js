import React, { useState } from 'react';

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setPrediction(null); // Reset prediction when new file is selected
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    setLoading(true);

    // Simulate API call
    try {
      // Replace this with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const data = await response.json();
      console.log(data); // See what your backend returns
      setPrediction(data.prediction);
      setPrediction('Prediction result: Benign'); // Example result
    } catch (error) {
      setPrediction('Error during prediction.');
    }

    setLoading(false);
  };

  return (
    <div className="upload-container">
      <h2>Upload Skin Image</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      {prediction && (
        <div className="prediction-result">
          {prediction}
        </div>
      )}
    </div>
  );
}

export default Upload;