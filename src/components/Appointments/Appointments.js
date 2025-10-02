import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Appointments.css';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [doctor, setDoctor] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/appointments');
                setAppointments(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAppointments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (doctor && date && time) {
            try {
                const res = await axios.post('http://localhost:5000/api/appointments', { doctor, date, time });
                setAppointments([...appointments, { id: res.data.id, doctor, date, time }]);
                setDoctor('');
                setDate('');
                setTime('');
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/appointments/${id}`);
            setAppointments(appointments.filter(appointment => appointment.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="appointments">
            <h1>Medical Appointments</h1>
            
            <div className="appointment-form-container">
                <h2>Schedule New Appointment</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="doctor">Doctor</label>
                        <input
                            id="doctor"
                            type="text"
                            placeholder="Enter doctor's name"
                            value={doctor}
                            onChange={(e) => setDoctor(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="time">Time</label>
                        <input
                            id="time"
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button type="submit">Schedule Appointment</button>
                </form>
            </div>
            
            <div className="appointments-list-container">
                <h2>Your Appointments</h2>
                {appointments.length === 0 ? (
                    <div className="empty-state">
                        <p>No appointments scheduled yet.</p>
                        <p>Schedule your first appointment using the form above.</p>
                    </div>
                ) : (
                    <ul>
                        {appointments.map((appointment) => (
                            <li key={appointment.id}>
                                <div className="appointment-info">
                                    <strong>Doctor:</strong> {appointment.doctor} <br />
                                    <strong>Date:</strong> {new Date(appointment.date).toLocaleDateString('en-US', { 
                                        weekday: 'long', 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })} <br />
                                    <strong>Time:</strong> {appointment.time}
                                </div>
                                <div className="appointment-actions">
                                    <button className="edit-btn">Reschedule</button>
                                    <button 
                                        className="delete-btn"
                                        onClick={() => handleDelete(appointment.id)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Appointments;