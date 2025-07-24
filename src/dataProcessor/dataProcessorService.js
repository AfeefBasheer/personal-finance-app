import dataProcessorRepository from './dataProcessorRepository'


function processRawData(rawData) {
  let processedData = {};
  processedData.debt = dataProcessorRepository.getDebt(
    rawData.currentLeasePayable,
    rawData.currentOtherFinancialLiabilities,
    rawData.nonCurrentLeasePayable,
    rawData.nonCurrentOtherFinancialLiabitlies
  );
  processedData.EBIT = dataProcessorRepository.getEBIT(
    rawData.profit,
    rawData.interestIncome,
    rawData.interestExpense,
    rawData.tax
  );
  processedData.captialEmployed = dataProcessorRepository.getCaptialEmployed(
    processedData.debt,
    rawData.equity
  );
  processedData.ROCE = dataProcessorRepository.getROCE(
    processedData.EBIT,
    processedData.captialEmployed
  );
  processRawData.PE = dataProcessorRepository.getPERatio(rawData.stockPrice, rawData.EPS);
  return processedData;
}

