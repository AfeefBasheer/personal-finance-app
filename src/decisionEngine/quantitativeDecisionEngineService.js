import quantitativeConstants from "./constants/quantitativeDecisionEngineConstant.js";

function getQuantitativeDecision(processedData) {
  let quantitativeDecision = getQuantitativeScore(
    quantitativeConstants.idealROCE,
    quantitativeConstants.idealPE,
    processedData.ROCE,
    processedData.PE,
    quantitativeConstants.PE_sensitivity,
    quantitativeConstants.PE_limit,
    quantitativeConstants.PE_scailing_factor
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

function getQuantitativeScore(
  idealROCE,
  idealPE,
  ROCE,
  PE,
  PE_sensitivity,
  PE_limit,
  PE_scailing_factor
) {
  let scores = {};
  
  if (ROCE >= idealROCE) {
    scores.ROCEscore = 5;
  } else {
    scores.ROCEscore = (ROCE / idealROCE) * 5;
  }
  PE = Math.max(0,PE)
  if (PE > PE_limit) {
    scores.PEscore = 0.05;
  } else {
    const diff = Math.abs(PE - idealPE);
    scores.PEscore = 5 - PE_scailing_factor * Math.pow(diff, PE_sensitivity);
  }

  scores.total = scores.ROCEscore + scores.PEscore;
  return scores;
}

function getAssessment(property, value) {
  if (value <= 2) return "Company has poor " + property;
  else if (value >= 4.5) return "Company has Excellent " + property;
  else return "Company has good " + property; 
}
