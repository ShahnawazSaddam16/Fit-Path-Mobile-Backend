const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true
        },
        Image: {
            data: Buffer,
            contentType: String
        },
        age: {
            type: Number,
            required: true
        },
        weight: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        },
        sports: {
            type: String,
            required: true
        },
        sleep: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Profile", profileSchema);