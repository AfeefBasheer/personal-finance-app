import dataProcessorRepository from "./dataProcessorRepository.js";

async function addRawData(rawData) {
  return await dataProcessorRepository.createNewRawData(rawData);
}

async function getAllRawData(rawData) {
  return await dataProcessorRepository.getAllRawData(rawData);
}
async function getRawDataByCompanyId(companyId){
  return await dataProcessorRepository.getRawDataByCompanyId(companyId)
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
  addRawData,
  getAllRawData,
  getRawDataByCompanyId,
};
