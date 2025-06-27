import mongoose from "mongoose";

const rawDataSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyID: { type: String, required: true },
  sector: { type: String,required:true },
  financialYear: { type: Number,},
  marketCapital: { type: Number },
  stockPrice: { type: Number },
  profit: { type: Number },
  EPS: { type: Number },
  equity: { type: Number },
  outstandingShares: { type: Number },
});

const RawData = mongoose.model("RawData", rawDataSchema);

export default RawData;
