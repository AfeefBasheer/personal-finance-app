import mongoose from "mongoose";

const rawDataSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    companyID: { type: String, required: true },
    sector: { type: String, required: true },
    financialYear: { type: Number },
    debt: { type: Number },
    EBIT: { type: Number },
    CapitalEmployed: { type: Number },
  },
  {
    timestamps: true,
  }
);
const RawData = mongoose.model("RawData", rawDataSchema);

export default RawData;
