import mongoose from "mongoose";

const rawDataSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    companyID: { type: String, required: true },
    sector: { type: String, required: true },
    financialYear: { type: Number, required: true },
    marketCapital: Number,
    stockPrice: Number,
    profit: Number,
    EPS: Number,
    equity: Number,
    outstandingShares: Number,
    interestIncome:Number,
    tax:Number,
    interestExpense:Number,
    currentLeasePayable:Number,
    currentOtherFinancialLiabilities:Number,
    nonCurrentLeasePayable:Number,
    nonCurrentOtherFinancialLiabitlies:Number
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("RawData", rawDataSchema);
