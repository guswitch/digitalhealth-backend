const mongoose = require('mongoose');

const NotificationsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    seen: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        //expires: 604800
    }
});

mongoose.model("Notifications", NotificationsSchema);