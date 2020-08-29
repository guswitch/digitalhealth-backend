const mongoose = require('mongoose');

const ContactsSchema = new mongoose.Schema({
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
    }
});

mongoose.model("Contacts", ContactsSchema);