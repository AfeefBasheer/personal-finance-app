import express from "express";
import quantitativeDecisionService from "../service/quantitativeDecisionService.js";

const Router = express.Router();

Router.get("/quantitativedecision", async (req, res) => {
    let response = await quantitativeDecisionService.getAllQuantitativeDecisions()
    if(!response) res.status(500).send()
    else res.status(200).send(response)
});

export default Router;
