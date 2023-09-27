import "./pre-start"; // Must be the first import
import logger from "jet-logger";

import EnvVars from "@src/constants/EnvVars";
import { app } from "./server";
import sqlDb from "./database";


// **** Run **** //
const SERVER_START_MSG = (`Express server started on port: ${EnvVars.Port.toString()}`);

// Sync Sequelize models with the database
sqlDb.sync()
    .then(() => {
        logger.info("Tables created successfully");

        // Start the Express server
        const serverInstance = app.listen(EnvVars.Port, async () => {
            logger.info(SERVER_START_MSG);
        });
    })
    .catch(err => logger.err("Unable to create tables", err));

