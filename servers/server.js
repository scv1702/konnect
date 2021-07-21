const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');

// DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_DB);
const db = mongoose.connection;

db.once('open', () => {
    console.log('DB connected');
});

db.on('error', (err) => {
    console.log(process.env.MONGO_DB);
    console.log('DB ERROR : ', err);
});

// React-Express connect
const corsOptions = {
    origin: true,
    credentials: true
};

const app = express();
const port = 8080;

// Middle-ware setting
app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: "dalkathon",
        cookie: {
            httpOnly: true,
            secure: false
        }
    })
);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/member", require("./routes/memberRouter"));
app.use("/study", require("./routes/studyRouter"));
app.use("/challenge", require("./routes/challengeRouter"));

app.listen(port, () => {
    console.log(`express is running on ${port}`);
});