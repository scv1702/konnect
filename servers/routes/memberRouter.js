const express = require("express");
const router = express.Router();
const User = require("../models/User");
const crypto = require("crypto");

// 회원가입
router.post("/join", async (req, res) => {
    try {
        let obj = { email: req.body.email };
        let user = await User.findOne(obj);
        if (user) {
            res.json({
                message: "이메일이 중복되었습니다. 새로운 이메일을 입력해주세요.",
                dupYn: "1"
            });
        } else {
            crypto.randomBytes(64, (err, buf) => {
                if (err) {
                    console.log(err);
                } else {
                    crypto.pbkdf2(req.body.password, buf.toString("base64"), 100000, 64, "sha512", async (err, key) => {
                        if (err) {
                            console.log(err);
                        } else {
                            buf.toString("base64");
                            obj = {
                                email: req.body.email,
                                name: req.body.name,
                                password: key.toString("base64"),
                                salt: buf.toString("base64")
                            };
                            user = new User(obj);
                            await user.save();
                            res.json({ message: "회원가입 되었습니다!", dupYn: "0" });
                        }
                    });
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

// 로그인
router.post("/login", async (req, res) => {
    try {
        await User.findOne({ email: req.body.email }, async (err, user) => {
            if (err) {
                console.log(err);
            } else {
                if (user) {
                    crypto.pbkdf2(req.body.password, user.salt, 100000, 64, "sha512", async (err, key) => {
                        if (err) {
                            console.log(err);
                        } else {
                            const obj = {
                                email: req.body.email,
                                password: key.toString("base64")
                            };
                            const user2 = await User.findOne(obj);
                            if (user2) {
                                try {
                                    await User.updateOne({ email: req.body.email }, { $set: { loginCnt: 0 } });
                                } catch (err) {
                                    console.log(err);
                                    res.json({ message: "로그인 실패" });
                                }
                                req.session.email = user.email;
                                res.json({
                                    message: "로그인 되었습니다!",
                                    _id: user2._id,
                                    email: user2.email
                                });
                            } else {
                                res.json({ message: "아이디나 비밀번호가 일치하지 않습니다." });
                            }
                        }
                    });
                } else {
                    res.json({ message: "아이디나 비밀번호가 일치하지 않습니다." });
                }
            }
        });
    } catch (err) {
        console.log(err);
        res.json({ message: "로그인 실패" });
    }
});

router.get("/logout", (req, res) => {
    console.log("/logout" + req.sessionID);
    req.session.destroy(() => {
        res.json({ message: true });
    });
});

router.post("/delete", async (req, res) => {
    try {
        await User.remove({
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
        await User.update({
            _id: req.body._id,
            name: req.body.name
        });
        res.json({ message: true });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

router.post("/add", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json({ message: true });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

router.post("/getAllMember", async (req, res) => {
    try {
        const user = await User.find({});
        res.json({ message: user });
    } catch (err) {
        console.log(err);
        res.json({ message: false });
    }
});

module.exports = router;