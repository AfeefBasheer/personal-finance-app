
function generateReport(rawData,processedData,quantitativeDecision) {
    let report = {...rawData,...processedData,...quantitativeDecision}
    return report
}

export default generateReport;