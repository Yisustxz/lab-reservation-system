import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

if (
  !process.env.DB_HOST ||
  !process.env.DB_PORT ||
  !process.env.DB_USER ||
  !process.env.DB_PASS ||
  !process.env.DB_NAME
) {
  console.error("Variables de entorno no configuradas en backend-reservations");
  throw new Error("Variables de entorno no configuradas en backend-computers");
}

const pool = new Pool({
  host: process.env.DB_HOST + "",
  port: parseInt(process.env.DB_PORT + ""),
  user: process.env.DB_USER + "",
  password: process.env.DB_PASS + "",
  database: process.env.DB_NAME + "",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default pool;
