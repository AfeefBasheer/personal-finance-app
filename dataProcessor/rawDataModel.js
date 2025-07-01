import mongoose from "mongoose";

const rawDataSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    companyID: { type: String, required: true },
    sector: { type: String, required: true },
    financialYear: Number,
    marketCapital: Number,
    stockPrice: Number,
    profit: Number,
    EPS: Number,
    equity: Number,
    outstandingShares: Number,
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("RawData", rawDataSchema);
