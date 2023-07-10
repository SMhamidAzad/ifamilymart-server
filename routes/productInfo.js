const router = require('express').Router();
const ProductInfo = require('../models/ProductInfo');
const { v4: uuidv4 } = require('uuid');

const multer = require("multer");
const express = require("express");
const product_route = express();
const bodyParser = require("body-parser");
product_route.use(bodyParser.json());
product_route.use(bodyParser.urlencoded({ extended: true }));
const sharp = require("sharp");
const path = require("path");
product_route.use(express.static('uploads'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/productImg'));
    },
    filename: function (req, file, cb) {
        //   const name = Date.now() + '-' + file.originalname;
        //   const webpName = name.replace(path.extname(name), '') + '.webp';
        const desiredFilename = req.body.filename; // Get the desired filename from the request body
        const webpName = desiredFilename.replace(path.extname(desiredFilename), '') + '.webp';
        cb(null, webpName);
    }
});

const fileFilter = function (req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, JPG, PNG, and SVG files are allowed.'));
    }
};


const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/", upload.single('image'), async (req, res) => {
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
