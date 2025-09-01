import express from "express";

import dataProcessorService from "../dataProcessor/dataProcessorService.js";
const Router = express.Router();

Router.post("/rawdata", async (req, res) => {
  try {
    let response = await dataProcessorService.addRawData(req.body);
    res.send(response);
  } catch (err) {
    console.log(err + " -Router");
  }
});

export default Router;
