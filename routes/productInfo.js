const router = require('express').Router();
const ProductInfo = require('../models/ProductInfo');

// create a ProductInfo
router.post("/", async (req, res) => {
    const newProductInfo = new ProductInfo(req.body)
    try {
        const savedProductInfo = await newProductInfo.save();
        res.status(200).send(savedProductInfo)
    } catch (error) {
        res.status(500).json(error)
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
