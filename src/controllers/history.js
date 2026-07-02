const History = require("../models/history");

const UserHistory = async (req, res) => {
    try {
        const userHistory = await History.find({
            userId: req.user._id
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: userHistory
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const DeleteHistory = async (req, res) => {
    try {
        const { id } = req.params;

        const history = await History.findOneAndDelete({
            _id: id,
            userId: req.user._id
        });

        if (!history) {
            return res.status(404).json({
                success: false,
                message: "History not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "History deleted successfully"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    UserHistory,
    DeleteHistory
};