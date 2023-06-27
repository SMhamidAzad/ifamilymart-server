const router = require('express').Router();
const Product = require('../models/Product');

// create a product
router.post("/", async(req,res)=>{
    const newProduct = new Product(req.body)
    try {
        const savedProduct = await newProduct.save();
        res.status(200).send(savedProduct)
    } catch (error) {
        res.status(500).json(error)
    }
})

// delete a product
router.delete("/:id", async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id)
        await product.deleteOne()
           res.status(200).json("Product is deleted successfully")
       
    } catch (error) {
        res.status(500).json(error);
    }
})

// get all brand
router.get("/all", async(req,res)=>{
    try {
        const  allProduct= await Product.find();
          res.status(200).json({
            message: "success",
            result: allProduct
          })
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router;
