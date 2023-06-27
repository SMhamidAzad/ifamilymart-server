const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const brandRouter = require('./routes/brand');
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/category');
const modalRouter = require('./routes/modal');
const sizeRouter = require('./routes/size');
const productInfoRouter = require('./routes//productInfo');
const cors = require("cors");
app.use(cors());

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
    console.log('Connected to MONGO');
});

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/brand", brandRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/modal", modalRouter);
app.use("/api/size", sizeRouter);
app.use("/api/productInfo", productInfoRouter);


app.listen(8000, () => {
    console.log(`Backend server is running on port`);
})