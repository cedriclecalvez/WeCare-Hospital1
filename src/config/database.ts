import config from "./constant";
import { getConnectionManager } from "typeorm";
// import { Doctor } from '../modules/Book/entity';
import User from "../modules/User/entity"

const entities = [User];

const connectionManager = getConnectionManager();
const db = connectionManager.create({
  type: "mysql",
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  logging: true,
  synchronize: true,
  entities: entities as any[],
});

export default db;
