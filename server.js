const express = require("express");
const mongoose = require("mongoose");

const Number = require("./numberModel");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/uniquenumdb", { useNewUrlParser: true });

app.post("/submit", ({body}, res) => {
    const submission = new Number(body);

    Number.create(submission)
        .then(dbNumber => {
            res.json(dbNumber);
        })
        .catch(err => {
            res.json(err);
        });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});