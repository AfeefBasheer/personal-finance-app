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

async function getRawDataByCompanyId(companyId) {
  try {
    return await rawDataModel.findOne({ companyID: companyId });
  } catch (err) {
    console.log(err + " - getRawDataByCompanyId() | dataProcessorRepository");
  }
}

async function deleteAllRawData(){
  try {
    return await rawDataModel.deleteMany();
  } catch (err) {
    console.log(err + " - getRawDataByCompanyId() | dataProcessorRepository");
  }
}


export default {
  createNewRawData,
  getAllRawData,
  getRawDataByCompanyId,
  deleteAllRawData
};
