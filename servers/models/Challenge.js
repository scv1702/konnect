const mongoose = require('mongoose');
const { Schema } = mongoose;

const {
    Types: { ObjectId }
} = Schema;

// DB schema
const challengeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    faceToFace: {
        type: Number,
        required: true
    },
    name: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    contact: {
        type: String,
        required: true
    },
    headCount: {
        type: Number,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Challenge', challengeSchema);