const Invoice = require("../models/invoice.model");

async function httpCreateInvoice(req, res, next) {
  const invoice = await Invoice.create(req.body);
  return res.status(201).json({ status: "success", data: invoice });
}

async function httpGetAllInvoice(req, res, next) {
  console.log(req.query);
  const invoices = await Invoice.find({
    poseMaster: req.query.poseMaster,
  }).populate("poseMaster");
  return res.status(200).json({ status: "success", data: invoices });
}

module.exports = { httpCreateInvoice, httpGetAllInvoice };
