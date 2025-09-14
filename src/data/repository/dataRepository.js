import dataModel from "../model/dataModel.js";

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
    console.log(err + " - getDataByCompanyId | dataRepository");
  }
}

async function deleteDataByCompanyId(companyId) {
  try {
    return await dataModel.deleteOne({ companyID: companyId });
  } catch (err) {
    console.log(err + "- deleteDataCompanyId | dataRepository");
  }
}

async function deleteAllData() {
  try {
    return await dataModel.deleteMany();
  } catch (err) {
    console.log(err + "- deleteDataCompanyId | dataRepository");
  }
}
export default {
  getAllData,
  createNewData,
  getDataByCompanyId,
  deleteDataByCompanyId,
  deleteAllData
};
