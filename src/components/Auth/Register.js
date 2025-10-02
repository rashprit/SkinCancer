// Register.js - Updated to match design system
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
import Heartbeat from '../../assets/heartbeat.svg';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        if (!formData.agreeToTerms) {
            alert('Please agree to the Terms of Service');
            return;
        }

        setIsLoading(true);
        
        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                }),
            });

            if (res.ok) {
                alert('Registration successful! Please login.');
                navigate('/login');
            } else {
                const data = await res.json();
                alert(data.error || 'Registration failed');
            }
        } catch (err) {
            console.error(err);
            alert('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-header">
                    <div className="logo">
                        <img src={Heartbeat} alt="Heartbeat" className="heartbeat-icon" />
                        <h1>SkinCheck</h1>
                    </div>
                    <p>Create your account</p>
                </div>
                
                <form className="auth-form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            placeholder="Choose a username"
                            name="username"
                            value={formData.username}
                            onChange={onChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            name="password"
                            value={formData.password}
                            onChange={onChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={onChange}
                            required
                        />
                    </div>
                    
                    <div className="terms-container">
                        <input
                            type="checkbox"
                            id="agreeToTerms"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={onChange}
                        />
                        <label htmlFor="agreeToTerms">
                            I agree to the <a href="/terms">Terms of Service</a>
                        </label>
                    </div>
                    
                    <button type="submit" className="auth-button" disabled={isLoading}>
                        {isLoading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>
                
                <div className="signin-link">
                    <p>Already have an account? <Link to="/login">Sign In</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;