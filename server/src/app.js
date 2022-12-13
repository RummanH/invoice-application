const express = require("express");
const cors = require("cors");
const invoiceRouter = require("./routes/invoice.router");
const userRouter = require("./routes/user.router");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/invoices", invoiceRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
