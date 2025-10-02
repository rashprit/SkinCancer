const express = require('express');
const router = express.Router();
const db = require('../models/Appointment');

// Get all appointments for a user
router.get('/', (req, res) => {
    // In a real app, you'd get the userId from the authenticated user
    const userId = 1; // Placeholder
    db.all('SELECT * FROM appointments WHERE userId = ?', [userId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Create a new appointment
router.post('/', (req, res) => {
    const { doctor, date, time } = req.body;
    // In a real app, you'd get the userId from the authenticated user
    const userId = 1; // Placeholder
    db.run('INSERT INTO appointments (doctor, date, time, userId) VALUES (?, ?, ?, ?)', [doctor, date, time, userId], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });
});

module.exports = router;