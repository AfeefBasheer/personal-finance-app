import Report from "./reportModel";
function generateReport(rawData, processedData, quantitativeDecision) {
  return new Report({ ...rawData, ...processedData, ...quantitativeDecision });
}

export default generateReport;