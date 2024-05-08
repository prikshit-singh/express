const express = require('express');
const router = express.Router();
const Tutorial = require('../../models/tutorial/tutorialSchema');

// GET endpoint to retrieve all tutorials
const getTutorial = router.get('/gettutorial', async (req, res) => {
    try {
        const tutorials = await Tutorial.find({}).populate('children');
        res.status(200).json({ tutorials });
    } catch (error) {
        console.error('Error getting tutorials:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = getTutorial;
