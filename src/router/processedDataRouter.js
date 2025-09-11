import express from "express";
import dataProcessorService from "../dataProcessor/dataProcessorService.js";

const Router = express.Router();

Router.get("/processeddata", async (req, res) => {
  let response = await dataProcessorService.getAllProcessedData();
  if (!response) res.status(500).send();
  else res.status(200).send(response);
});
export default Router;