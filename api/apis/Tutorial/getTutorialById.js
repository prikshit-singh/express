const express = require('express');
const app = express.Router();
const Tutorial = require('../../models/tutorial/tutorialSchema');

// Route handler to retrieve tutorial by ID and populate its children
const gettutorialbyid = app.post('/gettutorialbyid', async (req, res) => {
    try {
        const { id } = req.body;

        // Function to recursively populate child tutorials
        const populateChildren = async (tutorialModel, tutorialId) => {
            const tutorial = await tutorialModel.findById(tutorialId).populate('children');

            if (!tutorial) {
                return null;
            }
            // Recursively populate children
            for (const child of tutorial.children) {
                const populatedChild = await populateChildren(tutorialModel, child._id);
                if (populatedChild) {
                    // Replace the child with the populated child
                    const childIndex = tutorial.children.findIndex(c => c._id.equals(populatedChild._id));
                    if (childIndex !== -1) {
                        tutorial.children[childIndex] = populatedChild;
                    }
                }
            }
            return tutorial;
        };

        const populatedTutorial = await populateChildren(Tutorial, id);

        if (!populatedTutorial) {
            return res.status(404).json({ message: 'Tutorial not found' });
        }

        res.status(200).json({ tutorial: populatedTutorial });
    } catch (error) {
        console.error('Error getting tutorial:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = gettutorialbyid;
