import dataProcessor from "../dataProcessor/dataProcessorService.js";
import quantitativeDecisionEngine from "../decisionEngine/quantitativeDecisionEngineService.js";

function generateReport(rawData) {
  let processedData = dataProcessor.processRawData(rawData);
  let quantitativeDecision =
    quantitativeDecisionEngine.getQuantitativeDecision(processedData);
  return { processedData, quantitativeDecision };
}

export default generateReport;