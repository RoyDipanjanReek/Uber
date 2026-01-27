import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import { connectDB } from "./config/db.config.js";
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js"
import mapsRoutes from './routes/maps.routes.js'
import ridesRoutes from './routes/rides.route.js'

import dotenv from "dotenv"

const app = express();
dotenv.config()
connectDB()

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(cookieParser())


// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Uber backend API" });
});


// application API route are here
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/captain", captainRoutes)
app.use("/api/v1/maps", mapsRoutes)
app.use("/api/v1/rides", ridesRoutes)


export default app;
