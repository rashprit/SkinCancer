// SkinCancerDetection.js - Enhanced
import React, { useState } from 'react';
import axios from 'axios';
import './SkinCancerDetection.css';

const SkinCancerDetection = () => {
    const [file, setFile] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
            setPrediction(null);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type.startsWith('image/')) {
            setFile(droppedFile);
            setPrediction(null);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setPrediction(res.data.prediction);
        } catch (err) {
            console.error(err);
            alert('Error analyzing image. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className="skin-cancer-detection">
            <h1>Skin Cancer Detection</h1>
            <p>Upload an image of a skin lesion for AI-powered analysis</p>
            
            <form onSubmit={onSubmit}>
                <div 
                    className={`upload-area ${isDragOver ? 'drag-over' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="upload-icon">🩺</div>
                    <h3>Upload Skin Image</h3>
                    <p>Drag & drop or click to browse</p>
                    <p style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>
                        Supported: JPEG, PNG • Max: 10MB
                    </p>
                    
                    <input 
                        type="file" 
                        onChange={onFileChange} 
                        className="file-input" 
                        id="file-input"
                        accept="image/*"
                    />
                    <label htmlFor="file-input" className="file-label">
                        Choose File
                    </label>
                    
                    {file && (
                        <div style={{marginTop: '1rem', color: 'var(--primary-light)'}}>
                            📁 Selected: {file.name}
                        </div>
                    )}
                </div>

                <button 
                    type="submit" 
                    className="analyze-btn" 
                    disabled={!file || loading}
                >
                    {loading ? (
                        <>
                            <span className="loading"></span>
                            Analyzing...
                        </>
                    ) : (
                        'Analyze Image'
                    )}
                </button>
            </form>

            {prediction && (
                <div className="result">
                    <h3>Analysis Results</h3>
                    <div style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem'}}>
                        {prediction.classification}
                    </div>
                    <div style={{marginBottom: '1rem'}}>
                        Confidence: {Math.round(prediction.confidence * 100)}%
                    </div>
                    <div className="confidence-bar">
                        <div 
                            className="confidence-fill" 
                            style={{width: `${prediction.confidence * 100}%`}}
                        ></div>
                    </div>
                    <p style={{fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '1rem'}}>
                        <strong>Disclaimer:</strong> This analysis is for informational purposes only. 
                        Please consult a healthcare professional for medical advice.
                    </p>
                </div>
            )}
        </div>
    );
};

export default SkinCancerDetection;