const Profile = require("../models/profile");

const CreateProfile = async (req, res) => {
    try {
        const { age, weight, height, sports, sleep } = req.body;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image"
            });
        }

        if (!age || !weight || !height || !sports || !sleep) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        const existingProfile = await Profile.findOne({
            userId: req.user._id
        });

        if (existingProfile) {
            return res.status(400).json({
                success: false,
                message: "Profile already exists"
            });
        }

        const userProfile = await Profile.create({
            userId: req.user._id,
            email: req.user.email,
            Image: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            },
            age,
            weight,
            height,
            sports,
            sleep
        });

        res.status(201).json({
            success: true,
            message: "Profile created successfully",
            profile: userProfile
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const userProfile = async (req, res) => {
    try {
        const userprofile = await Profile.findOne({
            userId: req.user._id
        });

        if (!userprofile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        }

        return res.status(200).json({
            success: true,
            userprofile
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


module.exports = {
    CreateProfile,
    userProfile
};