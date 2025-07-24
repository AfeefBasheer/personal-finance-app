import rawDataModel from "./rawDataModel";
import processedDataModel from "./processedDataModel";


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

export default {
    getDebt,
    getEBIT,
    getPERatio,
    getCaptialEmployed,
    getROCE
}