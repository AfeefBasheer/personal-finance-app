import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    companyID: { type: String, required: true },
    sector: { type: String, required: true },
    financialYear: { type: Number },
    debt: { type: Number },
    EBITDA: { type: Number },
    ROCE: { type: Number },
    PE: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;

