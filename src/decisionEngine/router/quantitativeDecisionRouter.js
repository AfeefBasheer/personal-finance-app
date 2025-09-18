import express from "express";
import quantitativeDecisionEngineService from "../service/quantitativeDecisionEngineService.js";
const Router = express.Router();

Router.get("/quantitativedecision", async (req, res) => {
    let response = await quantitativeDecisionEngineService.getAllQuantitativeDecisions()
    if(!response) res.status(500).send()
    else res.status(200).send(response)
});
export default Router;
