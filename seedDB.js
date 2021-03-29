const mongoose = require("mongoose");
const db = require("./numberModel");

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/uniquenumdb"
);

const numSeed = [
    {
        submission: 69,
        date: new Date(Date.now())
    },
    {
        submission: 420,
        date: new Date(Date.now())
    }
];

db.Number
    .remove({})
    .then(() => db.Number.collection.insertMany(numSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });