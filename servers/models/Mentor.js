const mongoose = require('mongoose');
const { Schema } = mongoose;

const {
    Types: { ObjectId }
} = Schema;

// DB schema
const mentorSchema = new Schema({
    // 멘토 정보 (이름, 자기 소개, 학과, 입학 년도(학번), 학년)
    name: {
        type: String,
        required: true
    },
    introduce: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    admissionYear: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    // 카테고리
    category: {
        type: String,
        required: true
    },
    // 카카오톡 오픈 채팅방 링크
    kaTalkLink: {
        type: String,
        required: true
    },
    // 최대 인원 수(1~3명)
    numberOfPeople: {
        type: String,
        required: true
    },
    writer: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    // 생성 날짜
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Mentor', mentorSchema);