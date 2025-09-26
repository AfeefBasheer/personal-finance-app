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
    interestIncome: Number,
    tax: Number,
    interestExpense: Number,
    currentLeasePayable: Number,
    currentOtherFinancialLiabilities: Number,
    nonCurrentLeasePayable: Number,
    nonCurrentOtherFinancialLiabilities: Number,
  },
  {
    timestamps: true,
  }
);
rawDataSchema.index(
  { companyName: 1, companyID: 1, sector: 1, financialYear: 1 },
  { unique: true }
);

export default mongoose.model("RawData", rawDataSchema);
