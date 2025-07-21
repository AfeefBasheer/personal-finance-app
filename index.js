import express from "express";
import http from "http";
import appRouter from "./src/router/AppRouter.js";

const app = express();
http.createServer(app);

app.use("/", appRouter); // app using appRouter

app.get("/health", (req, res) => {
  res.send("The server is healthy");
});
app.listen(3000, () => {
  console.log("server running on port: 3000");
});
