import express from "express";
import reportService from "../service/reportService.js";

const Router = express.Router();

Router.get("/report", async (req, res) => {
  let response = await reportService.getAllReports();
  if (!response) res.status(500).send();
  else res.status(200).send(response);
});

Router.get("/report/:id", async (req, res) => {
  let response = await reportService.getReportByCompanyId(req.params.id);
  if (!response) res.status(404).send();
  else res.status(200).send(response);
});

Router.delete("/report/:id", async (req, res) => {
  let response = await reportService.deleteReportByCompanyId(req.params.id);
  if (!response) res.status(500).send();
  else res.status(200).send(response);
});

export default Router;
