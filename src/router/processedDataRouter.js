import express from "express";
import dataService from "../data/service/dataService.js";

const Router = express.Router();

Router.get("/processeddata", async (req, res) => {
  let response = await dataService.getAllProcessedData();
  if (!response) res.status(500).send();
  else res.status(200).send(response);
});

Router.get("/processeddata/:id", async (req, res) => {
  let response = await dataService.getProcessedDataByCompanyId(req.params.id);
  if (!response) res.status(404).send();
  else res.status(200).send(response);
});

export default Router;
