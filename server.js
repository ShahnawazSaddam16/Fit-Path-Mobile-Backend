const express = require("express");
const dotenv = require("dotenv");
const dbConnection = require("./src/config/dbConnection");

dotenv.config();
const app = express();
const PORT = process.env.PORT;

//Middleware
app.use(express.json());

//RateLimit

//Routes

//dbConnection
dbConnection()
  .then(() => console.log("✅✅ MongoDB Connected"))
  .catch((err) => console.log("❌❌ MongoDB Disconnected", err));

app.listen(PORT, (err) => {
  if (err) {
    console.error("❌❌ Server Disconnected");
  } else {
    console.log("✅✅ Server Connected Successfully");
  }
});
