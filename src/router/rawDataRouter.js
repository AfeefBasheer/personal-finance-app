import dataProcessorService from "../dataProcessor/dataProcessorService.js";
import express from "express";

const Router = express.Router();

Router.post("/rawdata", async (req, res) => {
  let response = await dataProcessorService.addRawData(req.body);
  if (!response) res.status(500).send();
  else res.status(201).send(response);
});

Router.get("/rawdata", async (req, res) => {
  let response = await dataProcessorService.getAllRawData();
  if (!response) res.status(500).send();
  else res.status(201).send(response);
});

Router.get("/rawdata/:id", async (req, res) => {
  let response = await dataProcessorService.getRawDataByCompanyId(
    req.params.id
  );
  if (!response) res.status(404).send(null);
  else res.status(200).send(response);
});

Router.delete("/rawdata", async (req, res) => {
  let response = await dataProcessorService.deleteAllRawData();
  if (!response) res.status(500).send();
  else res.status(204).send(response);
});

Router.delete("/rawdata/:id", async (req, res) => {
  let response = await dataProcessorService.deleteRawDataByCompanyId(
    req.params.id
  );
  if (!response) res.status(500).send();
  else res.status(200).send(response);
});

export default Router;
