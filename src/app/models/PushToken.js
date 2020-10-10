const mongoose = require('mongoose');

const PushTokenSchema = new mongoose.Schema({
    push_token: {
        type: String,
        required: true,
        unique: true
    }
});

mongoose.model("PushToken", PushTokenSchema);