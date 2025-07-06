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
  throw new Error("Variables de entorno no configuradas en backend-persons");
}

const pool = new Pool({
  user: process.env.DB_USER + "",
  host: process.env.DB_HOST + "",
  database: process.env.DB_NAME + "",
  password: process.env.DB_PASS + "",
  port: parseInt(process.env.DB_PORT + ""),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default pool;
