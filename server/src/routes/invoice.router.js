const { Router } = require("express");
const {
  httpCreateInvoice,
  httpGetAllInvoice,
} = require("../controllers/invoice.controller");
const catchAsync = require("../services/catchAsync");

const router = Router();

router
  .route("/")
  .post(catchAsync(httpCreateInvoice))
  .get(catchAsync(httpGetAllInvoice));

module.exports = router;
