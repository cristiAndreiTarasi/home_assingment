/**
 * Setup express server.
 */

import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import express, { Request, Response, NextFunction } from "express";
import logger from "jet-logger";
import cors from "cors";
import axios from "axios";

import "express-async-errors";


// local imports
import EnvVars from "@src/constants/EnvVars";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";

import { NodeEnvs } from "@src/constants/misc";
import { RouteError } from "@src/other/classes";
import userRoutes from "./routes/userRoutes";

// import 


// **** Variables **** //

export const app = express();


// **** Setup **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
    app.use(morgan("dev"));
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
    app.use(helmet());
}

// Add error handler
app.use((
    err: Error,
    _: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
) => {
    if (EnvVars.NodeEnv !== NodeEnvs.Test.valueOf()) {
        logger.err(err, true);
    }

    let status = HttpStatusCodes.BAD_REQUEST;

    if (err instanceof RouteError) {
        status = err.status;
    }

    return res.status(status).json({ error: err.message });
});


// ** Front-End Content ** //

// Set views directory (ejs)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Set static directory (js and css).
const staticDir = path.join(__dirname, "public");
app.use(express.static(staticDir));

// app routes
app.use("/auth", userRoutes);

// proxy for the weather api
app.get("/get-weather", async (req: Request, res: Response) => {
    try {
        const { latitude, longitude } = req.query;
        
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&daily=sunset,rain_sum,showers_sum,precipitation_hours&timezone=Europe%2FLondon`;
        
        const response = await axios.get(url);
        
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).send("Internal Server Error");
    }
});


// **** Export default **** //

export default app;
