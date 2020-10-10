const mongoose = require('mongoose');

const ProblemsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    }
});

mongoose.model("Problems", ProblemsSchema);