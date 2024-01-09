const mongoose = require('mongoose');
const ProblemSet = require('../models/ProblemSets');
const problemSets = require('./ProblemSetData'); // The data created in step 2

mongoose.connect('mongodb://localhost/yourdatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const seedDB = async () => {
    await ProblemSet.deleteMany({}); // Clear existing data
    await ProblemSet.insertMany(problemSets);
    console.log('Database seeded!');
};

seedDB().then(() => {
    mongoose.connection.close();
});
