const router = require('express').Router();
const ProductInfo = require('../models/ProductInfo');


const multer = require("multer");
const express = require("express");
const product_route = express();
const bodyParser = require("body-parser");
product_route.use(bodyParser.json());
product_route.use(bodyParser.urlencoded({ extended: true }));

const path = require("path");
product_route.use(express.static('uploads'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/productImg'), function (error, success) {
      if (error) throw error;
    });
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname;
    const webpName = name.replace(path.extname(name), '.webp');
    cb(null, webpName, function (error1, success1) {
      if (error1) throw error1;
    });
  }
});

// File filter function
const fileFilter = function (req, file, cb) {
  // Allowed file types
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
  if (allowedTypes.includes(file.mimetype)) {
    // Store the file
    cb(null, true);
  } else {
    // Reject file
    cb(new Error('Invalid file type. Only JPEG, JPG, PNG, and SVG files are allowed.'));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Use the upload middleware for file uploads
// product_route.post('/upload', upload.single('file'), function (req, res, next) {
  // Handle file upload here
  // If the file passed the file filter, it will be stored as WebP format
  // Otherwise, an error will be thrown and can be caught in the error handling middleware
//   res.send('File uploaded successfully');
// }, function (err, req, res, next) {
  // Error handling middleware
//   if (err instanceof multer.MulterError) {
    // Multer error occurred (e.g., file size exceeded)
    // res.status(400).json({ error: err.message });
//   } else {
    // File filter error occurred (e.g., invalid file type)
    // res.status(400).json({ error: err.message });
//   }
// });

// Start the server
product_route.listen(3000, function () {
  console.log('Server started on port 3000');
});

/* 
const multer = require("multer");
const express = require("express");
const product_route = express();
const bodyParser = require("body-parser");
product_route.use(bodyParser.json());
product_route.use(bodyParser.urlencoded({ extended: true }));

const path = require("path");
product_route.use(express.static('uploads'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/productImg'), function (error, success) {
      if (error) throw error;
    });
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname;
    cb(null, name, function (error1, success1) {
      if (error1) throw error1;
    });
  }
});

// File filter function
const fileFilter = function (req, file, cb) {
  // Allowed file types
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
  if (allowedTypes.includes(file.mimetype)) {
    // Store the file
    cb(null, true);
  } else {
    // Reject file
    cb(new Error('Invalid file type. Only JPEG, JPG, PNG, and SVG files are allowed.'));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });



*/
router.post("/", upload.single("image"), async(req, res) => {
    console.log(req.body,req.file)
    try {
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
    } catch(error) {
        res.status(400).send(error.message)
    }
})
// create a ProductInfo
// router.post("/", upload.single("productImg"), async (req, res) => {
// console.log(req.file)
// const newProductInfo = new ProductInfo(req.body)
// try {
// const savedProductInfo = await newProductInfo.save();
// res.status(200).send(savedProductInfo)
// } catch (error) {
// res.status(500).json(error)
// }
// })

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
