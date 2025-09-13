import express from "express";
import rawDataService from '../service/rawDataService.js'

const Router = express.Router();

Router.post("/rawdata", async (req, res) => {
  let response = await rawDataService.addRawData(req.body);
  if (!response) res.status(500).send();
  else res.status(201).send(response);
});

Router.get("/rawdata", async (req, res) => {
  let response = await rawDataService.getAllRawData();
  if (!response) res.status(500).send();
  else res.status(201).send(response);
});

Router.get("/rawdata/:id", async (req, res) => {
  let response = await rawDataService.getRawDataByCompanyId(req.params.id);
  if (!response) res.status(404).send(null);
  else res.status(200).send(response);
});

Router.delete("/rawdata", async (req, res) => {
  let response = await rawDataService.deleteAllRawData();
  if (!response) res.status(500).send();
  else res.status(204).send(response);
});

Router.delete("/rawdata/:id", async (req, res) => {
  let response = await rawDataService.deleteRawDataByCompanyId(req.params.id);
  if (!response) res.status(500).send();
  else res.status(200).send(response);
});

export default Router;
