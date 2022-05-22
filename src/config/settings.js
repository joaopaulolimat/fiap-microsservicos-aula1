import { enviroments } from "../utils/constants.js";
import {
  MONGO_CONNECTION_DEV,
  MONGO_CONNECTION_PRD,
  NODE_ENV,
} from "../utils/envs.js";

const env = NODE_ENV || enviroments.development;

const configSwitch = () => {
  switch (env) {
    case enviroments.development:
      return {
        dbPath: MONGO_CONNECTION_PRD,
        jwtSecret: "sss",
        jwtExpires: "2d",
        bcryptSalt: 10,
      };
    case enviroments.production:
      return {
        dbPath: MONGO_CONNECTION_DEV,
        jwtSecret: "sss",
        jwtExpires: "2d",
        bcryptSalt: 10,
      };
  }
};

const config = configSwitch();

export { config };
