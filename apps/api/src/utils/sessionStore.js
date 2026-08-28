import connectPgSimple from "connect-pg-simple";
import session from "express-session";
import { pool } from "../db/pool.js";

const PgSessionStore = connectPgSimple(session);

export const createSessionStore = () => {
  return new PgSessionStore({
    pool,
    tableName: "sessions",
    createTableIfMissing: true,
  });
};
