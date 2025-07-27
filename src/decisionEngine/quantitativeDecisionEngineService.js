import quantitativeConstants from "./constants/quantitativeDecisionEngineConstant.js";

function getQuantitativeDecision(processedData) {
  let quantitativeDecision = getQuantitativeScore(
    quantitativeConstants.idealROCE,
    quantitativeConstants.idealPE,
    processedData.ROCE,
    processedData.PE,
    quantitativeConstants.PE_sensitivity,
    quantitativeConstants.PE_limit,
    quantitativeConstants.PE_scailing_factor,
    quantitativeConstants.maxScore,
    quantitativeConstants.minPE,
    quantitativeConstants.PE_lowestAllowedScore
  );

  quantitativeDecision.PE_assessment = getAssessment(
    "PE ratio",
    quantitativeDecision.PEscore,
    quantitativeConstants.excellentGradeThreshold,
    quantitativeConstants.poorGradeThreshold
  );
  quantitativeDecision.ROCE_assessment = getAssessment(
    "ROCE ratio",
    quantitativeDecision.ROCEscore,
    quantitativeConstants.excellentGradeThreshold,
    quantitativeConstants.poorGradeThreshold
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
  PE_scailing_factor,
  maxScore,
  minPE,
  PE_lowestAllowedScore
) {
  let scores = {};

  if (ROCE >= idealROCE) {
    scores.ROCEscore = maxScore;
  } else {
    scores.ROCEscore = (ROCE / idealROCE) * maxScore;
  }
  PE = Math.max(minPE, PE);
  if (PE > PE_limit) {
    scores.PEscore = PE_lowestAllowedScore;
  } else {
    const diff = Math.abs(PE - idealPE);
    scores.PEscore =
      maxScore - PE_scailing_factor * Math.pow(diff, PE_sensitivity);
  }

  scores.total = scores.ROCEscore + scores.PEscore;
  return scores;
}

function getAssessment(
  property,
  value,
  excellentGradeThreshold,
  poorGradeThreshold
) {
  if (value <= poorGradeThreshold) return "Company has poor " + property;
  else if (value >= excellentGradeThreshold)
    return "Company has Excellent " + property;
  else return "Company has good " + property;
}
