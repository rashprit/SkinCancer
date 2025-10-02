import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import Auth from './components/Auth/Auth';
import SignUp from './components/Auth/SignUp';
import History from './components/History/History';
import Resources from './components/Resources/Resources';
import Upload from './components/Dashboard/Upload';
import Results from './components/Dashboard/Results';
import { Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="upload" />} />
          <Route path="upload" element={<Upload />} />
          <Route path="results" element={<Results />} />
          <Route path="history" element={<History />} />
          <Route path="resources" element={<Resources />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;