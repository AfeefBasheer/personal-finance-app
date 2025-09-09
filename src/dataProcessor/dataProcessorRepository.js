import rawDataModel from "./rawDataModel.js";

async function createNewRawData(rawData) {
  try {
    return (await rawDataModel.create(rawData))._id;
  } catch (err) {
    console.log(err + " - createNewRawData() | dataProcessorRepository");
  }
}

async function getAllRawData() {
  try {
    return await rawDataModel.find();
  } catch (err) {
    console.log(err + " - getallRawData() | dataProcessorRepository");
  }
}

async function getRawDataById(id) {
  try {
    return await rawDataModel.findOne({ companyID: id });
  } catch (err) {
    console.log(err + " - getRawDataById() | dataProcessorRepository");
  }
}

export default {
  createNewRawData,
  getAllRawData,
  getRawDataById,
};
