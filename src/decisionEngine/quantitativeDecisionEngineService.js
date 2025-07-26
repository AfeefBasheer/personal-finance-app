import quantitativeConstants from "./constants/quantitativeDecisionEngineConstant.js";

function getQuantitativeDecision(processedData) {
  let quantitativeDecision = getQuantitativeScore(
    quantitativeConstants.idealROCE,
    quantitativeConstants.idealPE,
    processedData.ROCE,
    processedData.PE,
    quantitativeConstants.PE_factor
  );

  quantitativeDecision.PE_assessment = getAssessment(
    "PE ratio",
    quantitativeDecision.PEscore
  );
  quantitativeDecision.ROCE_assessment = getAssessment(
    "ROCE ratio",
    quantitativeDecision.ROCEscore
  );

  return quantitativeDecision;
}

function getQuantitativeScore(idealROCE, idealPE, ROCE, PE, PE_factor) {
  let scores = {};

  if (ROCE > idealROCE) scores.ROCEscore = 5;
  else scores.ROCEscore = (ROCE / idealROCE) * 5;

  if (PE >= 5 && PE <= 25) {
    let diff = Math.abs(PE - idealPE);
    scores.PEscore = 5 - (diff / PE_factor) * 5;
  } else {
    scores.PEscore = 1;
  }

  if (scores.PEscore < 0) scores.PEscore = 0;

  scores.total = scores.ROCEscore + scores.PEscore;
  return scores;
}

function getAssessment(property, value) {
  if (value <= 2) return "Company has poor " + property;
  else if (value >= 4.5) return "Company has Excellent " + property;
  else if (value > 2) return "Company has good " + property;
}
