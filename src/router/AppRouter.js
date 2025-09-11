import processedDataRouter from "./processedDataRouter.js";
import rawDataRouter from "./rawDataRouter.js"
import express from "express"
const Router = express.Router()

Router.use("/",rawDataRouter)
Router.use("/",processedDataRouter)

export default Router