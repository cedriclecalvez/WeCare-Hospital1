import express from 'express';
import Server from './config/server';
import {db} from './config/database';
import middleware from './middlewares/middleware';
import routes from "./config/routes"
import errorHandler from "./middlewares/errorHandler"
import config from './config/constant';

const app = express();

const server = new Server(app);
server.connecte(db);
server.middlewares(middleware);
server.routes(routes)
server.errorHandler(errorHandler)
server.start(config.PORT);
