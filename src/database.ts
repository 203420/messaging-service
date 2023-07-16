import { config } from "dotenv";
import { Pool } from "pg";
config();

const dbconfig = {
  host: process.env.HOST,
  port: Number(process.env.DBPORT),
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
};

export const pool = new Pool(dbconfig);
