const mongoose = require("mongoose");

const manyItemsSchema = new mongoose.Schema({
    product_id: {
        type: String,
        default: null
    },
    product_title_eng: {
        type: String,
        default: null
    },
    product_title_beng: {
        type: String,
        default: null
    },
    size: {
        type: String,
        default: null
    },
    type_id: {
        type: String,
        default: null
    },
    subtype_id: {
        type: String,
        default: null
    },
    app_pic1: {
        type: String,
        default: null
    },
    web_pic1: {
        type: String,
        default: null
    },
    app_pic1: {
        type: String,
        default: null
    },
    product_pic1: {
        type: String,
        default: null
    },
    product_pic2: {
        type: String,
        default: null
    },
    product_pic3: {
        type: String,
        default: null
    },
    product_pic4: {
        type: String,
        default: null
    },
    symbol: {
        type: String,
        default: null
    },
    max_retail_price: {
        type: String,
        default: null
    },
    discount: {
        type: String,
        default: null
    },
    less_type: {
        type: String,
        default: null
    },
    sale_price: {
        type: String,
        default: null
    },
    purchase_price: {
        type: String,
        default: null
    },
    less_sr_apps: {
        type: String,
        default: null
    },
    less_type_sr_apps
        : {
        type: String,
        default: null
    },
    wholesale_price: {
        type: String,
        default: null
    },
    off: {
        type: String,
        default: null
    },
    off_type: {
        type: String,
        default: null
    },
    less_ws_apps: {
        type: String,
        default: null
    },
}, { timestamps: true })

module.exports = mongoose.model("manyItem",manyItemsSchema)