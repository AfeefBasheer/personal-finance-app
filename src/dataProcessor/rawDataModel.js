import mongoose from "mongoose";

const rawDataSchema = new mongoose.Schema(
  {
    companyName: { type: String},
    companyID: { type: String},
    sector: { type: String },
    financialYear: { type: Number},
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
