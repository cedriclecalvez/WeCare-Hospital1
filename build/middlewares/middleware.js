"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import the morgan library
const morgan_1 = __importDefault(require("morgan"));
// import the logger
const logger_1 = __importDefault(require("./logger"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors = require('cors');
// create a Morgan middleware instance
const morganMiddleware = (0, morgan_1.default)('combined', {
    // specify a function for skipping requests without errors
    skip: (req, res) => res.statusCode < 400,
    // specify a stream for requests logging
    stream: {
        write: (msg) => logger_1.default.http(msg),
    },
});
const middlewares = {
    apiLogger: morganMiddleware,
    json: express_1.default.json(),
    urlencoded: express_1.default.urlencoded({ extended: false }),
    cookie: (0, cookie_parser_1.default)(),
    cors: cors({ credentials: true })
};
exports.default = middlewares;
