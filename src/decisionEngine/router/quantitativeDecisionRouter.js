import express from "express";
import quantitativeDecisionEngineService from "../service/quantitativeDecisionService.js";
const Router = express.Router();

Router.get("/quantitativedecision", async (req, res) => {
  let response =
    await quantitativeDecisionEngineService.getAllQuantitativeDecisions();
  if (!response) res.status(500).send();
  else res.status(200).send(response);
});

Router.get("/quantitativedecision/:id", async (req, res) => {
  let response =
    await quantitativeDecisionEngineService.getQuantitativeDecisionByCompanyId(
      req.params.id
    );
  if (!response) res.status(404).send();
  else res.status(200).send(response);
});

export default Router;
