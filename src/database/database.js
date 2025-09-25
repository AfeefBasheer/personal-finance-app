import mongoose from "mongoose";

const database = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/personal_finance_app");

    console.log("MongoDB Connection Successful");
  } catch (e) {
    console.error("MongoDB Connection Failed", e);
    process.exit(1);
  }
};

export default database;
