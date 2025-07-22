import express from "express"

const Router = express.Router()
Router.get("/health", (req, res) => {
  res.send("The server is healthy");
});


export default Router