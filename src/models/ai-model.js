const mongoose = require("mongoose");

const aiChatSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        email:{
            type: String,
            required: true
        },
        profileId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile",
            required: true
        },
        prompt: {
            type: String,
            required: true
        },
        response: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("AIChat", aiChatSchema);