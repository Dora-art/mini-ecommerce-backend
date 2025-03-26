import express from "express";
import dotenv from "dotenv";
import apiRoutes from "./routes";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", apiRoutes);

export default app;
