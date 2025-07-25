let getDebt = (
  currentLeasePayable,
  currentOtherFinancialLiabilities,
  nonCurrentLeasePayable,
  nonCurrentOtherFinancialLiabitlies
) =>
  currentLeasePayable +
  currentOtherFinancialLiabilities +
  nonCurrentOtherFinancialLiabitlies +
  nonCurrentLeasePayable;

let getEBIT = (profit, interestIncome, interestExpense, tax) =>
  profit + tax + interestExpense - interestIncome;

let getCaptialEmployed = (debt, equity) => debt + equity;

let getROCE = (EBIT, captialEmployed) => EBIT / captialEmployed;

let getPERatio = (stockPrice, EPS) => stockPrice / EPS;

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
  processRawData.PE = getPERatio(rawData.stockPrice, rawData.EPS);
  return processedData;
}
