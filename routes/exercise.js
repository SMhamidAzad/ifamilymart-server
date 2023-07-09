const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { productInfoSchema } = require('../services/validationSchema');

const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));



router.post("/",productInfoSchema, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
   res.send(req.body)
})

/* 
router.post("/",[
    body('name','enter a valid name!').isLength({min: 3}),
    body('email','enter a valid email').isEmail(),
    body('password', 'password must be at least 5 characters!').isLength({min: 5}),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
   res.send(req.body)
})
*/

/* 
router.post("/",[
    body("brandName")
    .notEmpty().withMessage('Brand name is required')
    .isString().withMessage('Brand name must be a string')
    .isLength({ min: 6, max: 6 }).withMessage('Brand name must be exactly 6 characters'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
   res.send(req.body)
})
*/

router.post("/",productInfoSchema, async (req, res) => {
  console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
   res.send(req.body)
})

module.exports = router;
