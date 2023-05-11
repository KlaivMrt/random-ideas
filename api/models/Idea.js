// const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");

const IdeaSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Add a text field"]
    },
    tag: {
        type: String
    },
    username: {
        type: String
    },
    userId: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model("Idea", IdeaSchema);
