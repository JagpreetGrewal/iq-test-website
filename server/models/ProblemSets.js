const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: String,
    options: [String],
    answer: Number // or String, depending on how you structure it
});

const problemSetSchema = new mongoose.Schema({
    setName: String,
    questions: [questionSchema]
});

const ProblemSet = mongoose.model('ProblemSet', problemSetSchema);

module.exports = ProblemSet;
