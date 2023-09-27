/**
 * Environments variables declared here.
 */

import { NodeEnvs } from "./misc";

/* eslint-disable node/no-process-env */

const getDefaultPort = () => {
    switch (process.env.NODE_ENV) {
        case NodeEnvs.Dev:
            return 3000;
        case NodeEnvs.Test:
            return 3001;
        case NodeEnvs.Production:
            return 8000;
        default:
            return 3000; 
    }
};

export default {
    NodeEnv: (process.env.NODE_ENV ?? NodeEnvs.Dev),
    Port: (process.env.PORT ?? getDefaultPort()),
    JWT: {
        SecretKey: process.env.JWT_SECRET_KEY,
    },
} as const;
  