const router = require('express').Router();
const Size = require('../models/Size');

// create a Size
router.post("/", async (req, res) => {
    const newSize = new Size(req.body)
    try {
        const savedSize = await newSize.save();
        res.status(200).send(savedSize)
    } catch (error) {
        res.status(500).json(error)
    }
})

// delete a Modal
router.delete("/:id", async (req, res) => {
    try {
        const size = await Size.findById(req.params.id)
        await size.deleteOne()
        res.status(200).json("Size is deleted successfully")

    } catch (error) {
        res.status(500).json(error);
    }
})

// get all Size
router.get("/all", async (req, res) => {
    try {
        const allSize = await Size.find();
        res.status(200).json({
            message: "success",
            result: allSize
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// update a Size 
router.put("/:id", async (req, res) => {
    try {
        const result = await Size.findByIdAndUpdate(req.params.id, {
            $set: req.body
           }, { new: true }) 
        res.status(200).send({
            message: "Size successfully updated!"
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})
module.exports = router;
