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
    // 챌린지 카테고리
    category: {
        type: String,
        required: true
    },
    // 챌린지 설명 & 규칙
    rule: {
        type: String,
        required: true
    },
    // 챌린지 시작 날짜 
    startDate: {
        type: Date,
        required: true
    },
    // 챌린지 종료 날짜
    endDate: {
        type: Date,
        required: true
    },
    // 챌린지 하루 인증 횟수
    authPerDay: {
        type: String,
        required: true
    },
    // 챌린지 벌금
    pee: {
        type: String,
        required: true
    },
    // 카카오톡 오픈 채팅방 링크
    kaTalkLink: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    department: {
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