import config from "./constant";
import { ConnectionOptions, getConnectionManager } from "typeorm";
// import { Doctor } from '../modules/Book/entity';
import User from "../modules/User/entity"

const entities = [User];

const connectionManager = getConnectionManager();

const options : ConnectionOptions= {
  "type": "mysql",
  "host": config.DB_HOST,
  "port": config.DB_PORT,
  "username": config.DB_USERNAME,
  "password": config.DB_PASSWORD,
  "database": config.DB_NAME,
  "logging": true,
  // synchronize: true,
  "entities": entities as any[],
  "migrations": ["src/config/migration/*.js"],
    "cli": {
        "migrationsDir": "src/config/migration"
    }
};

const db = connectionManager.create(options);
export {db};
export default options;