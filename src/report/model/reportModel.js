import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
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
    debt: Number,
    EBIT: Number,
    capitalEmployed: Number,
    ROCE: Number,
    ROCEscore: Number,
    ROCE_assessment: String,
    PE: Number,
    PEscore: Number,
    PE_assessment: String,
    total_score: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Report", reportSchema);
