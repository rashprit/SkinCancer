const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');

router.post('/', (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ error: 'Error parsing form.' });
    }

    const { image } = files;

    if (!image) {
      return res.status(400).json({ error: 'No image file provided.' });
    }

    // For now, we'll just return a dummy prediction.
    const dummyPrediction = {
      prediction: 'Melanoma',
      confidence: 0.85,
    };

    res.json(dummyPrediction);
  });
});

module.exports = router;