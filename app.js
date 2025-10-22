// app.js

//only creating and exporting express.
import express from "express";
import appRouter from "./src/router/applicationRouter.js";

const app = express();
app.use(express.json());
app.use("/", appRouter);

export default app;
