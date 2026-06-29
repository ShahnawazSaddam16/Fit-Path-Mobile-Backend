const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnection = require("./src/config/dbConnection");
const authRoutes = require("./src/routes/authRoutes");
const profileRoutes = require("./src/routes/profileRoutes");

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
app.use("/api", profileRoutes);

app.get("/", (req, res) => {
    res.status(200).send("Server Running Successfully");
});

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