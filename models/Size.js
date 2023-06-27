const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema(
    {
        group: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Size", sizeSchema);