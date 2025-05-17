import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello from codebits backend");
});

//   routes import
import userRouter from "./routes/user.routes";
import fileRouter from "./routes/file.routes";
import folderRouter from "./routes/folder.routes";

//   routes declaration
app.use("/api/v1/user", userRouter);
app.use("/api/v1/file", fileRouter);
app.use("/api/v1/folder", folderRouter);

export default app;
