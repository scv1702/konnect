const express = require('express');
const Mentor = require('../models/Mentor');
const router = express.Router();

router.post("/delete", async (req, res) => {
    try {
        await Mentor.remove({
            _id: req.body._id
        });
        res.json({ message: true });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

router.post("/update", async (req, res) => {
    try {
        await Mentor.update(
            { _id: req.body._id },
            {
                $set: {
                    name: req.body.name,
                    introduce: req.body.introduce,
                    department: req.body.department,
                    admissionYear:  req.body.admissionYear,
                    grade: req.body.grade,
                    category: req.body.category,
                    kaTalkLink: req.body.kaTalkLink,
                    numberOfPeople: req.body.numberOfPeople,
                    writer: req.body._id,
                }
            }
        );
        res.json({ message: "멘토-멘티 모집 글이 수정 되었습니다." });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

router.post("/write", async (req, res) => {
    try {
        let obj = {
            name: req.body.name,
            introduce: req.body.introduce,
            department: req.body.department,
            admissionYear:  req.body.admissionYear,
            grade: req.body.grade,
            category: req.body.category,
            kaTalkLink: req.body.kaTalkLink,
            numberOfPeople: req.body.numberOfPeople,
            writer: req.body._id,
        };

        const mentor = new Mentor(obj);
        await mentor.save();
        res.json({ message: "멘토-멘티 모집이 업로드 되었습니다." });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

router.post("/getMentorList", async (req, res) => {
    try {
        const mentor = await Mentor.find({ }, null, {
            sort: { createdAt: -1 }
        });
        res.json({ list: mentor });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

router.post("/detail", async (req, res) => {
    try {
        const mentor = await Mentor.find({ _id: req.body._id });
        res.json({ mentor });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

module.exports = router;