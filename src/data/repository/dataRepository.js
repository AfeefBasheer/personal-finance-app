import dataModel from '../model/dataModel.js'

async function createNewProcessedData(processedData) {
  try {
    return await dataModel.create(processedData);
  } catch (err) {
    console.log(err + " - createNewProcessedData() | dataRepository");
  }
}

async function getAllProcessedData() {
  try {
    return await dataModel.find();
  } catch (err) {
    console.log(err + " - getAllProcessedData() | dataRepository");
  }
}

async function getProcessedDataByCompanyId(companyId) {
  try {
    return await dataModel.findOne({ companyID: companyId });
  } catch (err) {
    console.logo(
      err + " - getProcessedDataByCompanyId | dataRepository"
    );
  }
}

export default {
  getAllProcessedData,
  createNewProcessedData,
  getProcessedDataByCompanyId,
};
