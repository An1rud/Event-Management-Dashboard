const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        default: 'Attendee'
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Attendee', attendeeSchema);
