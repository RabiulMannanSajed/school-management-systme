import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./app/routes/index.js";
import cookieParser from "cookie-parser";
//import router from "./app/router/index.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes

app.use("/api/v1/schoolSystem", router);

const getController = (req, res) => {
  res.status(200).json({
    success: true,
    message: "school system server is running ",
  });
};

app.get("/", getController);

export default app;
