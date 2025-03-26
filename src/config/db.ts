import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? "5432"),
  database: process.env.DB_NAME,
};

let pool = new Pool(config);

export const connectDb = async () => {
  try {
    await pool.connect();
    console.log("Connected to PostgreSQL");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

export default pool;
