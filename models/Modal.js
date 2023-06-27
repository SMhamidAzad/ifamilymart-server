const mongoose = require("mongoose");

const modalSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        group: {
            type: String,
            required: true,
        },
        modal: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Modal", modalSchema);