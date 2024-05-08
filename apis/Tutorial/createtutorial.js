const express = require('express');
const router = express.Router();
const Tutorial = require('../../models/tutorial/tutorialSchema');

// POST endpoint to create a new tutorial
const createtutorial = router.post('/createtutorial', async (req, res) => {
    try {
        const { title, content, parentId } = req.body;
        
        // Create a new tutorial
        const tutorial = new Tutorial({
            title,
            content,
            children: [] // Initialize children array for the new tutorial
        });

        // If parentId is provided, find the parent tutorial and push the new tutorial as its child
        if (parentId) {
            const parentTutorial = await Tutorial.findById(parentId);
            if (!parentTutorial) {
                return res.status(404).json({ message: 'Parent tutorial not found' });
            }
            parentTutorial.children.push(tutorial);
            await parentTutorial.save();
        }

        // Save the new tutorial
        await tutorial.save();

        res.status(201).json({ message: 'Tutorial created successfully', tutorial });
    } catch (error) {
        console.error('Error creating tutorial:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = createtutorial;
