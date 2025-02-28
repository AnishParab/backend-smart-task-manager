require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const progressRoutes = require("./routes/progress");
const aiRoutes = require("./routes/ai");

const app = express();
connectDB();

//NOTE: Enabling CORS (5173:frontend can communicate with backend)
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/ai", aiRoutes);

app.listen(5000, () => console.log("Backend running on port 5000"));


//WARN: 
