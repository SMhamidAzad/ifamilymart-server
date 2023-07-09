const mongoose = require("mongoose");
const uniqid = require('uniqid');

const productInfoSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
    },
    group: {
      type: String,
    },
    unit: {
      type: String
    },
    quantity: {
      type: String,
    },
    price: {
      type: String,
    },
    image:{
      type: String,
      unique: true
    },
    productCode: {
      type: String,
      required: true,
      unique: true,
      default: () => uniqid("Product_")
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductInfo", productInfoSchema);