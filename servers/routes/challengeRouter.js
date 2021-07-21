const express = require('express');
const Challenge = require('../models/Challenge');
const router = express.Router();

router.post("/delete", async (req, res) => {
    try {
        await Challenge.remove({
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
        await Challenge.update(
            { _id: req.body._id },
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content
                }
            }
        );
        res.json({ message: "스터디가 수정 되었습니다." });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

router.post("/write", async (req, res) => {
    try {
        let obj = {
            writer: req.body._id,
            title: req.body.title,
            content: req.body.content,
        };

        const challenge = new Challenge(obj);
        await challenge.save();
        res.json({ message: "스터디가 업로드 되었습니다." });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

router.post("/getStudyList", async (req, res) => {
    try {
        const _id = req.body._id;
        const challenge = await Challenge.find({ writer: _id }, null, {
            sort: { createdAt: -1 }
        });
        res.json({ list: challenge });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

router.post("/detail", async (req, res) => {
    try {
        const _id = req.body._id;
        const challenge = await Challenge.find({ _id });
        res.json({ study });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

module.exports = router;