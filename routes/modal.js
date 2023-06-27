const router = require('express').Router();
const Modal = require('../models/Modal');

// create a modal
router.post("/", async (req, res) => {
    const newModal = new Modal(req.body)
    try {
        const savedModal = await newModal.save();
        res.status(200).send(savedModal)
    } catch (error) {
        res.status(500).json(error)
    }
})

// delete a Modal
router.delete("/:id", async (req, res) => {
    try {
        const modal = await Modal.findById(req.params.id)
        await modal.deleteOne()
        res.status(200).json("Modal is deleted successfully")

    } catch (error) {
        res.status(500).json(error);
    }
})

// get all Modal
router.get("/all", async (req, res) => {
    try {
        const allModal = await Modal.find();
        res.status(200).json({
            message: "success",
            result: allModal
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// update a modal 
router.put("/update/:id", async (req, res) => {
    try {
        const result = await Modal.findByIdAndUpdate(req.params.id, {
            $set: req.body
           }, { new: true }) 
        // const result = await Modal.updateOne({ _id: id }, updateDoc);
        res.status(200).send({
            message: "Modal successfully updated!",
            result: result
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})
module.exports = router;
