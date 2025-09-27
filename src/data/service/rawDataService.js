import rawDataRepository from "../repository/rawDataRespository.js";
import dataService from "./dataService.js";

async function addRawData(rawData) {
  const savedRawData = await rawDataRepository.createNewRawData(rawData);
  if (savedRawData) {
    let data = dataService.processRawData(savedRawData);
    await dataService.addData(rawData, data);
    return savedRawData;
  }
}

async function getAllRawData() {
  return await rawDataRepository.getAllRawData();
}

async function getRawDataByCompanyId(companyId) {
  return await rawDataRepository.getRawDataByCompanyId(companyId);
}

async function deleteAllRawData() {
  return await rawDataRepository.deleteAllRawData();
}

async function deleteRawDataByCompanyId(companyId) {
  return await rawDataRepository.deleteRawDataByCompanyId(companyId);
}

export default {
  addRawData,
  getAllRawData,
  getRawDataByCompanyId,
  deleteAllRawData,
  deleteRawDataByCompanyId,
};
