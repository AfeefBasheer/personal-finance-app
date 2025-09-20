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

Router.delete("/data/:id", async (req, res) => {
  let response = await dataService.deleteDataByCompanyId(req.params.id);
  if (!response) res.status(500).send();
  else res.status(204).send(response);
});

Router.delete("/data", async (req, res) => {
  let response = await dataService.deleteAllData();
  if (!response) res.status(500).send();
  else res.status(204).send(response);
});

Router.patch("/data/:id", async (req, res) => {
  let response = await dataService.updateDataByCompanyId(req.params.id,req.body);
  if (!response) res.status(404).send();
  else res.status(202).send(response);
});
export default Router;
