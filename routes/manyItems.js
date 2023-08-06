const router = require('express').Router();
const ManyItems = require('../models/ManyItems');

router.get("/",async(req,res,next)=>{
    try {
        const result = await ManyItems.findOne();
        console.log(result)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
})
router.post("/", async(req,res,next)=>{
    try {
        const newManyItems = new ManyItems(req.body);
        const ManyItems = await newManyItems.save()
        console.log(ManyItems)
        res.status(200).json({
            message: "success",
            result: ManyItems
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router;
