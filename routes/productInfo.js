const router = require('express').Router();
const ProductInfo = require('../models/ProductInfo');

const express = require("express");
const product_route = express();
const bodyParser = require("body-parser");
product_route.use(bodyParser.json());
product_route.use(bodyParser.urlencoded({ extended: true }));
product_route.use(express.static('uploads'));
const imageUploadMiddleware = require('../middleware/imageUploadMiddleware')


router.post("/", imageUploadMiddleware, async (req, res) => {
    console.log(req.file)
    try {
        const existingProduct = await ProductInfo.findOne({ image: req.file.filename });
        if (existingProduct) {
            res.status(500).json({ message: "Duplicate image. Same image cannot be uploaded multiple times." });
        }
        const newProductInfo = new ProductInfo({
            brandName: req.body.brandName,
            group: req.body.group,
            unit: req.body.unit,
            quantity: req.body.quantity,
            price: req.body.price,
            image: req.file.filename,
        });

        const savedProductInfo = await newProductInfo.save();
        res.status(200).send({
            message: "success",
            data: savedProductInfo
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
})


// delete a Modal
router.delete("/:id", async (req, res) => {
    try {
        const productInfo = await ProductInfo.findById(req.params.id)
        await productInfo.deleteOne()
        res.status(200).json("product is deleted successfully")

    } catch (error) {
        res.status(500).json(error);
    }
})

// get all Modal
router.get("/all", async (req, res) => {
    try {
        const allProductInfo = await ProductInfo.find();
        res.status(200).json({
            message: "success",
            result: allProductInfo
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// update a ProductInfo 
router.put("/update/:id", async (req, res) => {
    try {
        const result = await ProductInfo.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        // const result = await ProductInfo.updateOne({ _id: id }, updateDoc);
        res.status(200).send({
            message: "Product successfully updated!",
            result: result
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})
module.exports = router;
