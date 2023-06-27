const router = require('express').Router();
const Brand = require('../models/Brand');

// create a post
router.post("/", async(req,res)=>{
    const newBrand = new Brand(req.body)
    try {
        const savedBrand = await newBrand.save();
        res.status(200).send(savedBrand)
    } catch (error) {
        res.status(500).json(error)
    }
})

// delete a brand
router.delete("/:id", async(req,res)=>{
    try {
        const brand = await Brand.findById(req.params.id)
        await brand.deleteOne()
           res.status(200).json("Brand is deleted successfully")
       
    } catch (error) {
        res.status(500).json(error);
    }
})

// get all brand
router.get("/all", async(req,res)=>{
    try {
        const  allBrand= await Brand.find();
          res.status(200).json({
            message: "success",
            result: allBrand
          })
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router;
