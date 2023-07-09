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
const exerciseRouter = require('./routes/exercise');
const port = process.env.PORT || 8000;
const productInfoRouter = require('./routes//productInfo');
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
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
app.use("/api/exercise", exerciseRouter);
app.use("/api/productInfo", productInfoRouter);

app.all("*",(req,res)=>{
    res.send('No Route Found')
})
app.listen(port, () => {
    console.log(`Backend server is running on port`);
})