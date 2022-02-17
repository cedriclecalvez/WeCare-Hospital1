"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("./config/server"));
const database_1 = __importDefault(require("./config/database"));
const middleware_1 = __importDefault(require("./middlewares/middleware"));
const routes_1 = __importDefault(require("./config/routes"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const constant_1 = __importDefault(require("./config/constant"));
const app = (0, express_1.default)();
const server = new server_1.default(app);
server.connecte(database_1.default);
server.middlewares(middleware_1.default);
server.routes(routes_1.default);
server.errorHandler(errorHandler_1.default);
server.start(constant_1.default.PORT);
