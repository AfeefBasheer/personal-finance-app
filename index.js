import express from "express";
import http from "http";
import router from './src/router/router'

const app = express();
http.createServer(app);

app.get("/health", (req, res) => {
  res.send("The server is healthy");
});
app.listen(3000, () => {
  console.log("server running on port: 3000");
});
