const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/productImg'));
  },
  filename: function (req, file, cb) {
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

module.exports = upload.single('image');
