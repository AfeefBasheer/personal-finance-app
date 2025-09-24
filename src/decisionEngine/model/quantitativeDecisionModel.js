import mongoose from "mongoose";

const quantitativeDecisionSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    companyID: { type: String, required: true },
    sector: { type: String, required: true },
    financialYear: { type: Number, required: true },
    ROCEscore: Number,
    PEscore: Number,
    PE_assessment: String,
    ROCE_assessment: String,
    total_score: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "QuantitativeDecision",
  quantitativeDecisionSchema
);
