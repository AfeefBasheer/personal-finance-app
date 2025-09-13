import express from "express";
import dataService from "../service/dataService.js";

const Router = express.Router();

Router.get("/data", async (req, res) => {
  let response = await dataService.getAllData();
  if (!response) res.status(500).send();
  else res.status(200).send(response);
});

Router.get("/data/:id", async (req, res) => {
  let response = await dataService.getDataByCompanyId(req.params.id);
  if (!response) res.status(404).send();
  else res.status(200).send(response);
});

export default Router;
