import app from "./app.js";
import database from "./src/database/database.js";

const portNumber = 8080;

database();// connecting to DB here
app.listen(portNumber, () => {
  console.log(`server running on port: ${portNumber}`);
});
