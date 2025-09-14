import dataRouter from "../data/router/dataRouter.js";
import rawDataRouter from "../data/router/rawDataRouter.js"
import express from "express"

const appRouter = express.Router()

appRouter.use("/",rawDataRouter)
appRouter.use("/",dataRouter)

export default appRouter