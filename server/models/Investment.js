const mongoose = require("mongoose");

const InvestmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  assetType: { type: String, required: true },
  quantity: { type: Number, required: true },
  purchasePrice: { type: Number, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Investment", InvestmentSchema);
