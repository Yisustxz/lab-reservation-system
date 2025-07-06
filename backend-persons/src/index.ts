import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import pool from "./database";
import userRoutes from "./routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({
      status: "OK",
      service: "backend-persons",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "BDDERROR",
      service: "backend-persons",
      timestamp: new Date().toISOString(),
      details:
        error instanceof Error ? error.message : "Unknown database error",
    });
  }
});

app.get("/ping", (req, res) => {
  res.send("Backend Persons service is active");
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Backend Persons service running on port ${PORT}`);
});
