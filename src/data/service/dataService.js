import dataRepository from "../repository/dataRepository.js";

async function addProcessedData(processedData) {
  return await dataRepository.createNewProcessedData(processedData);
}
async function getAllProcessedData() {
  return await dataRepository.getAllProcessedData();
}
async function getProcessedDataByCompanyId(companyId) {
  return await dataRepository.getProcessedDataByCompanyId(companyId);
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
  let processedData = {};

  processedData.companyName = rawData.companyName;
  processedData.companyID = rawData.companyID;
  processedData.sector = rawData.sector;
  processedData.financialYear = rawData.financialYear;

  processedData.debt = getDebt(
    rawData.currentLeasePayable,
    rawData.currentOtherFinancialLiabilities,
    rawData.nonCurrentLeasePayable,
    rawData.nonCurrentOtherFinancialLiabitlies
  );
  processedData.EBIT = getEBIT(
    rawData.profit,
    rawData.interestIncome,
    rawData.interestExpense,
    rawData.tax
  );
  processedData.captialEmployed = getCaptialEmployed(
    processedData.debt,
    rawData.equity
  );
  processedData.ROCE = getROCE(
    processedData.EBIT,
    processedData.captialEmployed
  );
  processedData.PE = getPERatio(rawData.stockPrice, rawData.EPS);
  return processedData;
}

export default {
  processRawData,
  getAllProcessedData,
  getProcessedDataByCompanyId,
  addProcessedData
};
