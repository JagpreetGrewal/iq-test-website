const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    problemSetId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Problem Set
        required: true,
        ref: 'ProblemSet'
    },
    score: {
        type: Number,
        required: true
    },
    recordedAt: {
        type: Date,
        default: Date.now
    }
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
