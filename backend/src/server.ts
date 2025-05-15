import dotenv from "dotenv";
import app from "./app";
import connectDB from "./db/db_index";

dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    const PORT = Number(process.env.PORT) || 8000;

    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed!", err);
  });
