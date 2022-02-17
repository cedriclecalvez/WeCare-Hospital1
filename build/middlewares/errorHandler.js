"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    console.error(err);
    res.status(status).json(err.message);
};
exports.default = errorHandler;
