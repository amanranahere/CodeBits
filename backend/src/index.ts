import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import app from "./app";
import connectDB from "./db/db_index";

connectDB();

export default app;
