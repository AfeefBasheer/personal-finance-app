import decisionEngineModel from "../model/quantitativeDecisionModel.js";

async function addQuantitativeDecision(quantiativeDecision) {
  try {
    return await decisionEngineModel.create(quantiativeDecision);
  } catch (err) {
    console.log(err);
  }
}

async function getAllQuantitativeDecisions() {
  try {
    return await decisionEngineModel.find();
  } catch (err) {
    console.log(err);
  }
}

async function getQuantitativeDecisionByCompanyId(companyId) {
  try {
    return await decisionEngineModel.findOne({ companyID: companyId });
  } catch (err) {
    console.log(err);
  }
}

export default {
  addQuantitativeDecision,
  getAllQuantitativeDecisions,
  getQuantitativeDecisionByCompanyId,
};
