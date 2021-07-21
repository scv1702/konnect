const mongoose = require('mongoose');
const { Schema } = mongoose;

const {
    Types: { ObjectId }
} = Schema;

// DB schema
const studySchema = new Schema({
    // 스터디 제목
    title: {
        type: String,
        required: true
    },
    /*
    // 카테고리
    category: {
        type: Number,
        required: true
    },
    */
    // 스터디 설명 & 규칙
    rule: {
        type: String,
        required: true
    },
    // 스터디 최종 목표
    goal: {
        type: String,
        required: true
    },
    // 카카오톡 오픈 채팅방 링크
    kaTalkLink: {
        type: String,
        required: true
    },
    // 스터디 개설자 정보 - 이름
    name: {
        type: String,
        required: true
    },
    // 스터디 개설자 정보 - 학과
    department: {
        type: String,
        required: true
    },
    writer: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    // 스터디 생성 날짜
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Study', studySchema);