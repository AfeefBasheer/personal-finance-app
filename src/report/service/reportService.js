import reportRepository from "../repository/reportRepository.js";

async function addReport(report) {
  return await reportRepository.addReport(report);
}

async function getAllReports() {
  return await reportRepository.getAllReports();
}

async function getReportByCompanyId(companyId) {
  return await reportRepository.getReportByCompanyId(companyId);
}

function generateReport(rawData, processedData, quantitativeDecision) {
  return { ...rawData, ...processedData, ...quantitativeDecision };
}

export default {
  generateReport,
  addReport,
  getAllReports,
  getReportByCompanyId,
};