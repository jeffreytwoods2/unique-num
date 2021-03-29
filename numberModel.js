const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NumberSchema = new Schema({
    submission: {
        type: Number,
        unique: true,
        match: [/^[0-9]+$/, "Please enter a valid integer"]
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Submission = mongoose.model("Number", NumberSchema);

module.exports = Submission;