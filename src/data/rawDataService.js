import rawDataRepository from "./rawDataRespository.js";
import dataService from "./dataService.js";

async function addRawData(rawData) {
  const savedRawData = await rawDataRepository.createNewRawData(rawData);
  let processedData =
    dataService.processRawData(savedRawData);
  await dataService.addProcessedData(processedData);
  return savedRawData;
}

async function getAllRawData(rawData) {
  return await rawDataRepository.getAllRawData(rawData);
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
