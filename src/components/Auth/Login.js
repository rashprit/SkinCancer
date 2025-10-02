import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import Heartbeat from '../../assets/heartbeat.svg';
import { GoogleLogin } from '@react-oauth/google';
import AppleLogin from 'react-apple-login';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    try {
      console.log('Sending login request with:', { email, password });
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });
      console.log('Received response:', response);

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful, received data:', data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', email);
        navigate('/dashboard');
      } else {
        const data = await response.json();
        console.error('Login failed with status:', response.status, 'and message:', data.error);
        alert(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Something went wrong. Please try again later.');
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
          <p>Sign in to continue to your dashboard.</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <div className="auth-options">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
          <button type="submit" className="auth-button">Sign In</button>
        </form>
        <div className="divider">OR</div>
        <div className="social-login">
          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
              // TODO: Send the credentialResponse.credential to your backend for verification
              navigate('/dashboard');
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
          <AppleLogin
            clientId="com.example.web"
            redirectURI="https://example.com"
            onSuccess={(response) => console.log(response)}
            onError={(error) => console.error(error)}
            render={(renderProps) => (
              <button className="social-button apple" onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign In with Apple</button>
            )}
          />
        </div>
        <div className="signup-link">
          <p>Don't have an account? <a href="/SignUp">Create an account</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;