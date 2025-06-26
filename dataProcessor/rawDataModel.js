import mongoose from "mongoose";

const rawDataSchema = new mongoose.Schema({
  companyName: String,
  companyID: String,
  sector:String,
  financialYear:Number,
  marketCapital:Number,
  priceOfStock:Number,
  profit:Number,
  EPS:Number,
  outstandingShares:Number,
});

const rawData = new mongoose.model('rawData',rawDataSchema)

export default rawData
