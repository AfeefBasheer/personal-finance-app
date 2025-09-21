import quantitativeDecisionEngineService from "../../decisionEngine/service/quantitativeDecisionService.js";
import dataRepository from "../repository/dataRepository.js";

async function addData(data) {
  const savedData = await dataRepository.createNewData(data);
  let quantitativeDecision =
    quantitativeDecisionEngineService.getQuantitativeDecision(savedData);
  await quantitativeDecisionEngineService.addQuantitativeDecision(
    quantitativeDecision
  );
  return savedData;
}
async function getAllData() {
  return await dataRepository.getAllData();
}
async function getDataByCompanyId(companyId) {
  return await dataRepository.getDataByCompanyId(companyId);
}
async function deleteDataByCompanyId(companyId) {
  return await dataRepository.deleteDataByCompanyId(companyId);
}
async function deleteAllData() {
  return await dataRepository.deleteAllData();
}
async function updateDataByCompanyId(companyId, updateData) {
  return await dataRepository.updateDataByCompanyId(companyId, updateData);
}
const getDebt = (
  currentLeasePayable,
  currentOtherFinancialLiabilities,
  nonCurrentLeasePayable,
  nonCurrentOtherFinancialLiabitlies
) =>
  currentLeasePayable +
  currentOtherFinancialLiabilities +
  nonCurrentOtherFinancialLiabitlies +
  nonCurrentLeasePayable;

const getEBIT = (profit, interestIncome, interestExpense, tax) =>
  profit + tax + interestExpense - interestIncome;

const getCaptialEmployed = (debt, equity) => debt + equity;

const getROCE = (EBIT, captialEmployed) => EBIT / captialEmployed;

const getPERatio = (stockPrice, EPS) => stockPrice / EPS;

function processRawData(rawData) {
  let data = {};

  data.companyName = rawData.companyName;
  data.companyID = rawData.companyID;
  data.sector = rawData.sector;
  data.financialYear = rawData.financialYear;

  data.debt = getDebt(
    rawData.currentLeasePayable,
    rawData.currentOtherFinancialLiabilities,
    rawData.nonCurrentLeasePayable,
    rawData.nonCurrentOtherFinancialLiabitlies
  );
  data.EBIT = getEBIT(
    rawData.profit,
    rawData.interestIncome,
    rawData.interestExpense,
    rawData.tax
  );
  data.captialEmployed = getCaptialEmployed(data.debt, rawData.equity);
  data.ROCE = getROCE(data.EBIT, data.captialEmployed);
  data.PE = getPERatio(rawData.stockPrice, rawData.EPS);
  return data;
}

export default {
  processRawData,
  getAllData,
  getDataByCompanyId,
  addData,
  deleteDataByCompanyId,
  deleteAllData,
  updateDataByCompanyId,
};
