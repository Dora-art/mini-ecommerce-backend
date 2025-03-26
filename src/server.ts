import app from "./app";
import { connectDb } from "./config/db";

const start = () => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
    connectDb();
  });
};

start();

