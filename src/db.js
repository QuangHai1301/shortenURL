import { Pool } from "pg"
const pool = new Pool({
  host: process.env.DB_HOST || "postgres",
  user: "postgres",
  password: "postgres",
  database: "shortener",
  port: 5432
})

export default pool