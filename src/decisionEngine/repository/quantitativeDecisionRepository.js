import decisionEngineModel from "../model/quantitativeDecisionModel.js";

async function addQuantitativeDecision(quantiativeDecision) {
  try {
    return await decisionEngineModel.create(quantiativeDecision);
  } catch (err) {
    console.log(
      err + " - addQuantitativeDecision | quantitaticeDecisionRepository"
    );
  }
}

async function getAllQuantitativeDecisions() {
  try {
    return await decisionEngineModel.find();
  } catch (err) {
    console.log(
      err + " - getAllQuantitativeDecisions | quantitaticeDecisionRepository"
    );
  }
}

async function getQuantitativeDecisionByCompanyId(companyId) {
  try {
    return await decisionEngineModel.findOne({ companyID: companyId });
  } catch (err) {
    console.log(
      err +
        " - getQuantitativeDecisionByCompanyId | quantitaticeDecisionRepository"
    );
  }
}

async function deleteQuantitativeDecisionByCompanyId(companyId) {
  try {
    return await decisionEngineModel.deleteOne({ companyID: companyId });
  } catch (err) {
    console.log(
      err +
        " - deleteQuantitativeDecisionByCompanyId | quantitaticeDecisionRepository"
    );
  }
}

export default {
  addQuantitativeDecision,
  getAllQuantitativeDecisions,
  getQuantitativeDecisionByCompanyId,
  deleteQuantitativeDecisionByCompanyId,
};
