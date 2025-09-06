import express from "express";
import dataProcessorService from "../dataProcessor/dataProcessorService.js";

const Router = express.Router();

Router.post("/rawdata", async (req, res) => {
    let response = await dataProcessorService.addRawData(req.body);
    res.send(response);
});

export default Router;
