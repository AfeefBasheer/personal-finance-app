import reportModel from "../model/reportModel.js";

async function addReport(report) {
  try {
    return await reportModel.create(report);
  } catch (err) {
    console.log(err + " - addReport | reportRepository");
  }
}

async function getAllReports() {
  try {
    return await reportModel.find();
  } catch (err) {
    console.log(err + " - getAllReports | reportRepository");
  }
}

async function getReportByCompanyId(companyId) {
  try {
    return await reportModel.findOne({ companyID: companyId });
  } catch (err) {
    console.log(err + " - getReportByCompanyId | reportRepository");
  }
}

async function deleteReportByCompanyId(companyId) {
  try {
    return await reportModel.deleteOne({ companyID: companyId });
  } catch (err) {
    console.log(err + " - deleteReportByCompanyId | reportRepository");
  }
}

export default {
  getAllReports,
  addReport,
  getReportByCompanyId,
  deleteReportByCompanyId,
};
