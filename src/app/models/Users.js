const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    isVerified: {
        type: Boolean
    }
});

mongoose.model('Users', UsersSchema);