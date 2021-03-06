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
                    category: req.body.category,
                    rule: req.body.rule,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                    authPerDay: req.body.authPerDay,
                    pee: req.body.pee,
                    kaTalkLink: req.body.kaTalkLink,
                    name: req.body.name,
                    department: req.body.department,
                    writer: req.body._id
                }
            }
        );
        res.json({ message: "챌린지가 수정 되었습니다." });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

router.post("/write", async (req, res) => {
    try {
        let obj = {
            title: req.body.title,
            category: req.body.category,
            rule: req.body.rule,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            authPerDay: req.body.authPerDay,
            pee: req.body.pee,
            kaTalkLink: req.body.kaTalkLink,
            name: req.body.name,
            department: req.body.department,
            writer: req.body._id
        };

        const challenge = new Challenge(obj);
        await challenge.save();
        res.json({ message: "챌린지가 업로드 되었습니다." });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

router.post("/getChallengeList", async (req, res) => {
    try {
        const challenge = await Challenge.find({ }, null, {
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
        const challenge = await Challenge.find({ _id: req.body._id });
        res.json({ challenge });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

module.exports = router;