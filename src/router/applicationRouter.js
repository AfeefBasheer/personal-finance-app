import dataRouter from "../data/router/dataRouter.js";
import quantitativeDecisionRouter from "../decisionEngine/router/quantitativeDecisionRouter.js";
import rawDataRouter from "../data/router/rawDataRouter.js";
import reportRouter from "../report/router/reportRouter.js";
import express from "express";

const appRouter = express.Router();

appRouter.use("/", rawDataRouter);
appRouter.use("/", dataRouter);
appRouter.use("/", quantitativeDecisionRouter);
appRouter.use("/", reportRouter);

export default appRouter;
