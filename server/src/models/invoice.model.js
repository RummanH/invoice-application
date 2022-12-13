const { Schema, model } = require("mongoose");

const invoiceSchema = new Schema({
  customerName: String,
  invoiceId: String,
  date: Date,

  products: [
    {
      product: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalPrice: Number,
  totalQuantity: Number,
  poseMaster: { type: Schema.Types.ObjectId, ref: "User" },
});

const Invoice = model("Invoice", invoiceSchema);
module.exports = Invoice;
