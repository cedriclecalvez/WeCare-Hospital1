"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import the winston library
const winston_1 = __importDefault(require("winston"));
// filter function,
// that will allow logging only the specified log level
const filter = (level) => winston_1.default.format((info) => {
    if (info.level === level) {
        return info;
    }
})();
// log levels system
const levels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    http: 5,
};
const transports = [
    // create a logging target for errors and fatals
    new winston_1.default.transports.File({
        filename: './logs/error.log',
        level: 'error',
        format: winston_1.default.format.combine(
        // add a timestamp
        winston_1.default.format.timestamp(), 
        // use JSON form
        winston_1.default.format.json()),
    }),
    // create a logging target for logs of different levels
    new winston_1.default.transports.File({
        filename: './logs/combined.log',
        level: 'info',
        // use simple form
        format: winston_1.default.format.simple(),
    }),
    // create a logging target for HTTP logs
    new winston_1.default.transports.File({
        filename: './logs/http.log',
        level: 'http',
        // process only HTTP logs
        format: filter('http'),
    }),
    // create a logging target for debug logs
    new winston_1.default.transports.Console({
        level: 'debug',
        // specify format for the target
        format: winston_1.default.format.combine(
        // process only debug logs
        filter('debug'), 
        // colorize the output
        winston_1.default.format.colorize(), 
        // add a timestamp
        winston_1.default.format.timestamp(), 
        // use simple form
        winston_1.default.format.simple()),
    }),
];
// create a Winston logger
const logger = winston_1.default.createLogger({
    // specify the own log levels system
    levels,
    // specify the logging targets
    transports,
});
// export the logger
exports.default = logger;
