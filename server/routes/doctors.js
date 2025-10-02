const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const { lat, lon } = req.query;

    // In a real application, you would use a service like Google Places API to find doctors.
    // For now, I'll return some dummy data.
    const dummyDoctors = [
        { name: 'Dr. Smith - Dermatologist', address: '123 Main St' },
        { name: 'Dr. Jones - Skin Clinic', address: '456 Oak Ave' },
        { name: 'Dr. Williams - Dermatology Center', address: '789 Pine Ln' },
    ];

    res.json(dummyDoctors);
});

module.exports = router;