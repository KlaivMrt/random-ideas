// const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Add an username"]
    },
    email: {
        type: String,
        required: [true, "Add an email"]
    },
    password: {
        type: String,
        required: [true, "Add a password"]
    }
});

module.exports = mongoose.model("User", UserSchema);