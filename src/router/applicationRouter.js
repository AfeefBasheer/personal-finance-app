import processedDataRouter from "./processedDataRouter.js";
import rawDataRouter from "./rawDataRouter.js"
import express from "express"

const appRouter = express.Router()

appRouter.use("/",rawDataRouter)
appRouter.use("/",processedDataRouter)

export default appRouter