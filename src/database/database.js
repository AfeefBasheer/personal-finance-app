import mongoose from "mongoose";

const database = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/FinanceApp");
    console.log("MongoDB Connection Successful");
  } catch (e) {
    console.error("MongoDB Connection Failed", e);
    process.exit(1);
  }
};

export default database;
