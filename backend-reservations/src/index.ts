import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import pool from "./database";
import reservationRoutes from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

app.use("/api/reservations", reservationRoutes);

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({
      status: "OK",
      service: "backend-reservations",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: "BDDERROR",
      service: "backend-reservations",
      timestamp: new Date().toISOString(),
      details:
        error instanceof Error ? error.message : "Unknown database error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend-reservations running on port ${PORT}`);
});

export default app;
