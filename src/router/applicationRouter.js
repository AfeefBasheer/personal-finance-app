import rataRouter from "../data/router/DataRouter.js";
import rawDataRouter from "../data/router/rawDataRouter.js"
import express from "express"

const appRouter = express.Router()

appRouter.use("/",rawDataRouter)
appRouter.use("/",rataRouter)

export default appRouter