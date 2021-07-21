const mongoose = require('mongoose');
const { Schema } = mongoose;

const {
    Types: { ObjectId }
} = Schema;

// DB schema
const challengeSchema = new Schema({
    // 챌린지 제목
    title: {
        type: String,
        required: true
    },
    // 챌린지 하루 인증 횟수
    authPerDay: {
        type: String,
        required: true
    },
    // 챌린지 인증 가능 시작 시간
    authAvailStart: {
        type: String,
        required: true
    },
    // 챌린지 인증 가능 시작 시간
    authAvailEnd: {
        type: String,
        required: true
    },
    // 챌린지 참가비
    pee: {
        type: String,
        required: true
    },
    // 챌린지 시작 월 
    startMon: {
        type: String,
        required: true
    },
    // 챌린지 시작 일
    startDay: {
        type: String,
        required: true
    },
    writer: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Challenge', challengeSchema);