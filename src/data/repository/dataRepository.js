import dataModel from '../model/dataModel.js'

async function createNewData(data) {
  try {
    return await dataModel.create(data);
  } catch (err) {
    console.log(err + " - createNewData() | dataRepository");
  }
}

async function getAllData() {
  try {
    return await dataModel.find();
  } catch (err) {
    console.log(err + " - getAllData() | dataRepository");
  }
}

async function getDataByCompanyId(companyId) {
  try {
    return await dataModel.findOne({ companyID: companyId });
  } catch (err) {
    console.logo(
      err + " - getDataByCompanyId | dataRepository"
    );
  }
}

export default {
  getAllData,
  createNewData,
  getDataByCompanyId,
};
