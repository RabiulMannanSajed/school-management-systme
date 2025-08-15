import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";
import config from "./app/config/index.js";

dotenv.config();
async function main() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(config.database_url);
    console.log("MongoDB connected successfully!");

    app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}
main();
