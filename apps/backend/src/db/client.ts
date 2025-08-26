import { Pool } from "pg";

const pool = new Pool({
  user: "your_user",
  host: "localhost",
  database: "workflow_empire",
  password: "your_password",
  port: 5432,
});

export const db = {
  query: (text: string, params?: any[]) => pool.query(text, params),
};
