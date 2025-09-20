import quantitativeConstants from "../constants/quantitativeDecisionEngineConstant.js";
import quantitativeDecisionEngineRepository from "../repository/quantitativeDecisionEngineRepository.js";

async function getAllQuantitativeDecisions() {
  return await quantitativeDecisionEngineRepository.getAllQuantitativeDecisions();
}

async function addQuantitativeDecision(quantitativeDecision) {
  return await quantitativeDecisionEngineRepository.addQuantitativeDecision(
    quantitativeDecision
  );
}
async function getQuantitativeDecisionByCompanyId(companyId) {
  return await quantitativeDecisionEngineRepository.getQuantitativeDecisionByCompanyId(
    companyId
  );
}
function getQuantitativeDecision(processedData) {
  const companyDetails = {
    companyName: processedData.companyName,
    companyID: processedData.companyID,
    sector: processedData.sector,
    financialYear: processedData.financialYear,
  };

  let quantitativeDecision = getQuantitativeScore(
    quantitativeConstants.IDEAL_ROCE,
    quantitativeConstants.IDEAL_PE,
    processedData.ROCE,
    processedData.PE,
    quantitativeConstants.PE_SENSITIVITY,
    quantitativeConstants.PE_LIMIT,
    quantitativeConstants.PE_SCALING_FACTOR,
    quantitativeConstants.MAX_SCORE,
    quantitativeConstants.MIN_PE,
    quantitativeConstants.PE_LOWEST_ALLOWED_SCORE
  );

  quantitativeDecision.PE_assessment = getAssessment(
    "PE ratio",
    quantitativeDecision.PEscore,
    quantitativeConstants.EXCELLENT_GRADE_THRESHOLD,
    quantitativeConstants.POOR_GRADE_THRESHOLD
  );
  quantitativeDecision.ROCE_assessment = getAssessment(
    "ROCE ratio",
    quantitativeDecision.ROCEscore,
    quantitativeConstants.EXCELLENT_GRADE_THRESHOLD,
    quantitativeConstants.POOR_GRADE_THRESHOLD
  );
  return { ...companyDetails, ...quantitativeDecision };
}

function getQuantitativeScore(
  IDEAL_ROCE,
  IDEAL_PE,
  ROCE,
  PE,
  PE_SENSITIVITY,
  PE_LIMIT,
  PE_SCALING_FACTOR,
  MAX_SCORE,
  MIN_PE,
  PE_LOWEST_ALLOWED_SCORE
) {
  let scores = {};

  if (ROCE >= IDEAL_ROCE) {
    scores.ROCEscore = MAX_SCORE;
  } else {
    scores.ROCEscore = (ROCE / IDEAL_ROCE) * MAX_SCORE;
  }
  PE = Math.max(MIN_PE, PE);
  if (PE > PE_LIMIT) {
    scores.PEscore = PE_LOWEST_ALLOWED_SCORE;
  } else {
    const diff = Math.abs(PE - IDEAL_PE);
    scores.PEscore =
      MAX_SCORE - PE_SCALING_FACTOR * Math.pow(diff, PE_SENSITIVITY);
    scores.PEscore = Math.max(PE_LOWEST_ALLOWED_SCORE, scores.PEscore);
  }

  scores.total = scores.ROCEscore + scores.PEscore;
  return scores;
}

function getAssessment(
  property,
  value,
  EXCELLENT_GRADE_THRESHOLD,
  POOR_GRADE_THRESHOLD
) {
  if (value <= POOR_GRADE_THRESHOLD)
    return "Company's " + property + " is Poor";
  else if (value >= EXCELLENT_GRADE_THRESHOLD)
    return "Company's " + property + " is Excellent";
  else return "Company's " + property + " is Good";
}

export default {
  getQuantitativeDecision,
  getAllQuantitativeDecisions,
  addQuantitativeDecision,
  getQuantitativeDecisionByCompanyId,
};
