const express = require("express");
const cors = require('cors');
const app = express();
const errorMiddleware = require("./middlewares/error");

const products = require("./routes/product");
const productMaster = require("./routes/productMaster");
const buyers = require("./routes/buyer");
const sellers = require("./routes/seller");
const invoices = require("./routes/invoice");
const userRoutes = require("./routes/userRoutes");
app.use(express.json());
app.use(cors());
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/", products);
app.use("/api/v1/", productMaster);
app.use("/api/v1/", buyers);
app.use("/api/v1/", sellers);
app.use("/api/v1/", invoices);

app.use(errorMiddleware);

module.exports = app;
