import express from "express";
import http from "http";
import database from "./src/database/database.js";
import appRouter from "./src/router/AppRouter.js";

const app = express();
const portNumber = 8080;

http.createServer(app);

database();
app.use(express.json());
app.use("/", appRouter); // app using appRouter

app.listen(portNumber, (err) => {
  if (err) console.log("ERROR - " + err);
  else console.log(`server running on port: ${portNumber}`);
});
