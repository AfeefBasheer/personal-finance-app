import rawDataModel from "./rawDataModel.js";

async function createNewRawData(rawData) {
  try {
    return await rawDataModel.create(rawData);
  } catch (err) {
    console.log(err + " - createNewRawData() | rawDataRepository");
  }
}

async function getAllRawData() {
  try {
    return await rawDataModel.find();
  } catch (err) {
    console.log(err + " - getallRawData() | rawDataRepository");
  }
}

async function getRawDataByCompanyId(companyId) {
  try {
    return await rawDataModel.findOne({ companyID: companyId });
  } catch (err) {
    console.log(err + " - getRawDataByCompanyId() | rawDataRepository");
  }
}

async function deleteAllRawData() {
  try {
    return await rawDataModel.deleteMany();
  } catch (err) {
    console.log(err + " - getRawDataByCompanyId() | rawDataRepository");
  }
}

async function deleteRawDataByCompanyId(companyId) {
  try {
    return await rawDataModel.deleteOne({ companyID: companyId });
  } catch (err) {
    console.log(
      err + " - deleteRawDataByCompanyId() | rawDataRepository"
    );
  }
}

export default {
  createNewRawData,
  getAllRawData,
  getRawDataByCompanyId,
  deleteAllRawData,
  deleteRawDataByCompanyId,
};
