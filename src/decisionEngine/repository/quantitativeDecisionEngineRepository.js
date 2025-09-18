import decisionEngineModel from "../model/quantitativeDecisionEngineModel.js";

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
export default { addQuantitativeDecision, getAllQuantitativeDecisions };
