const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnection = require("./src/config/dbConnection");
const authRoutes = require("./src/routes/authRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT;

//Middleware
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

//Routes
app.use("/api/auth", authRoutes);

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