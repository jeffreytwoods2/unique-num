const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const Number = require("./numberModel");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/uniquenumdb',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/submit", ({body}, res) => {
    const submission = new Number(body);

    Number.create(submission)
        .then(() => {
            res.sendFile(path.join(__dirname, "/public/unique.html"));
        })
        .catch(err => {
            if (err.name === "ValidationError") {
                res.sendFile(path.join(__dirname, "/public/notNum.html"));
            } else if (err.name === "MongoError") {
                res.sendFile(path.join(__dirname, "/public/notUnique.html"));
            }
        });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});