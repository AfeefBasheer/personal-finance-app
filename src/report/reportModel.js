import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    companyID: { type: String, required: true },
    sector: { type: String, required: true },
    financialYear: { type: Number,required:true },
    debt: Number,
    EBIT: Number,
    ROCE: Number,
    PE: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Report", reportSchema);



