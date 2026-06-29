const Profile = require("../models/profile");

  const CreateProfile = async (req, res) => {
    try {
        const { Image, age, weight, height, sports, sleep } = req.body;

        if (!Image || !age || !weight || !height || !sports || !sleep) {
            return res.status(401).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        const existingProfile = await Profile.findOne({ userId: req.user._id });

        if (existingProfile) {
            return res.status(400).json({
                success: false,
                message: "Profile already exists"
            });
        }

        const userProfile = await Profile.create({
            userId: req.user._id,
            Image,
            age,
            weight,
            height,
            sports,
            sleep
        });

        return res.status(201).json({
            success: true,
            message: "Profile created successfully",
            profile: userProfile
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    CreateProfile
};