import express from "express"
import dataProcessorService from "../dataProcessor/dataProcessorService.js";
import { Query } from "mongoose";
const Router = express.Router()

Router.post("/rawdata", async (req, res) => {
  let response = await dataProcessorService.addRawData({...req.query})
  res.send(response)
  console.log(response)
});

export default Router