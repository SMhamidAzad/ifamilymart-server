const router = require('express').Router();
const Category = require('../models/Category');

// create a product
router.post("/", async (req, res) => {
    // console.log(req.body)

    try {
        const newCategory = new Category({
            group: req.body.group,
            categoryName: req.body.categoryName
        })
        console.log(newCategory)
        const savedCategory = await newCategory.save();
        res.status(200).send(savedCategory)
    } catch (error) {
        res.status(500).json(error)
    }
})

// delete a product
router.delete("/:id", async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        await category.deleteOne()
        res.status(200).json("Category is deleted successfully")

    } catch (error) {
        res.status(500).json(error);
    }
})

// get all brand
router.get("/all", async (req, res) => {
    try {
        const allCategory = await Category.find();
        res.status(200).json({
            message: "success",
            result: allCategory
        })
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router;
