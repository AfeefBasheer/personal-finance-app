import express from "express";
import reportService from "../service/reportService.js";

const Router = express.Router();

Router.get("/report", async (req, res) => {
  let response = await reportService.getAllReports();
  if (!response) res.status(500).send();
  else res.status(200).send(response);
});

export default Router;
