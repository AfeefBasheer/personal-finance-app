import rawDataModel from "./rawDataModel.js";
import processedDataModel from "./processedDataModel.js";

async function createNewRawData(rawData) {
  try {
    return await rawDataModel.create(rawData);
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

async function createNewProcessedData(processedData) {
  try {
    return await processedDataModel.create(processedData);
  } catch (err) {
    console.log(err + " - createNewProcessedData() | dataProcessorRepository");
  }
}

async function getRawDataByCompanyId(companyId) {
  try {
    return await rawDataModel.findOne({ companyID: companyId });
  } catch (err) {
    console.log(err + " - getRawDataByCompanyId() | dataProcessorRepository");
  }
}

async function deleteAllRawData() {
  try {
    return await rawDataModel.deleteMany();
  } catch (err) {
    console.log(err + " - getRawDataByCompanyId() | dataProcessorRepository");
  }
}

async function deleteRawDataByCompanyId(companyId) {
  try {
    return await rawDataModel.deleteOne({ companyID: companyId });
  } catch (err) {
    console.log(
      err + " - deleteRawDataByCompanyId() | dataProcessorRepository"
    );
  }
}

async function getAllProcessedData() {
  try {
    return await processedDataModel.find();
  } catch (err) {
    console.log(err + " - getAllProcessedData() | dataProcessorRepository");
  }
}

async function getProcessedDataByCompanyId(companyId) {
  try {
    return await processedDataModel.findOne({ companyID: companyId });
  } catch (err) {
    console.logo(
      err + " - getProcessedDataByCompanyId | dataProcessorRepository"
    );
  }
}

export default {
  createNewRawData,
  getAllRawData,
  getRawDataByCompanyId,
  deleteAllRawData,
  deleteRawDataByCompanyId,
  getAllProcessedData,
  createNewProcessedData,
  getProcessedDataByCompanyId,
};
