const mongoose = require('mongoose');

// DB schema
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    loginCnt: {
        type: Number,
        default: 0
    },
    lockYn: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;