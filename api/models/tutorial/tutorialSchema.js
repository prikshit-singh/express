const mongoose = require('mongoose');

const tutorialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tutorial' // Reference to the Tutorial model itself, allowing for recursive relationships
    }]
});

const Tutorial = mongoose.model('Tutorial', tutorialSchema);

module.exports = Tutorial;