import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import requestRoutes from "./routes/requestRoute.js";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from "url";

dotenv.config();

// mobgodb connectivity after dotenv.config
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// rest object
const app = express();


// middleware
app.use(cors());
// to enable sending json in req and res
app.use(express.json());
// :method :url :status :response-time ms - :res[content-length]
// no need in production // work when you hit
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, './client/build')))

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/request", requestRoutes);


//rest api
app.use('*', function(req, res){
  res.sendFile(path.join(__dirname, "./client/build/index.html"))
})


// Port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `Sever running on ${process.env.DEV_MODE} mode on PORT - ${PORT}`.bgBlue
      .white
  );
});
