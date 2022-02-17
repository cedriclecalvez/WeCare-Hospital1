"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = __importDefault(require("./constant"));
const typeorm_1 = require("typeorm");
// import { Doctor } from '../modules/Book/entity';
const entity_1 = __importDefault(require("../modules/User/entity"));
const entities = [entity_1.default];
const connectionManager = (0, typeorm_1.getConnectionManager)();
const db = connectionManager.create({
    type: "mysql",
    host: constant_1.default.DB_HOST,
    port: constant_1.default.DB_PORT,
    username: constant_1.default.DB_USERNAME,
    password: constant_1.default.DB_PASSWORD,
    database: constant_1.default.DB_NAME,
    logging: true,
    synchronize: true,
    entities: entities,
});
exports.default = db;
