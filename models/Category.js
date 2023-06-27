const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    group: {
      type: String,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);