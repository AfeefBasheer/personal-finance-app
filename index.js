import app from "./app.js";
import database from "./src/database/database.js";

const portNumber = 8080;

// connect to DB and start server here.
database();
app.listen(portNumber, () => {
  console.log(`server running on port: ${portNumber}`);
});
