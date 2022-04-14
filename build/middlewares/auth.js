"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccess = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constant_1 = __importDefault(require("../config/constant"));
const ApiError_1 = __importDefault(require("../helpers/ApiError"));
const entity_1 = __importDefault(require("../modules/User/entity"));
const typeorm_1 = require("typeorm");
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = req.headers.authorization;
        if (!authorization)
            throw new ApiError_1.default(401, "missing authorization header");
        let access_token = req.headers.authorization.split(" ")[1];
        if (!access_token)
            throw new ApiError_1.default(401, "missing refresh_token");
        // const refresh_token = req.cookies.refresh_token;
        // if (!refresh_token)
        //   return res.status(401).json("Access denied. Your session expired");
        const entityManager = (0, typeorm_1.getManager)();
        let user = yield entityManager.findOne(entity_1.default, { access_token });
        console.log("findOne a user:    =>   ", user);
        if (!user)
            return res.status(401).json("1:Access denied. Your session expired");
        // const decoded = await jwt.verify(access_token, config.JWT_SECRET);
        yield jsonwebtoken_1.default.verify(access_token, constant_1.default.JWT_SECRET);
        req.user = user;
        // req.userID = decoded.id;
        next();
    }
    catch (error) {
        res.status(401).json("2:Access denied. Your session expired");
    }
});
const refreshAccess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refresh_token } = req.cookies;
        if (!refresh_token)
            return res.status(401).json("4:Access denied. Your session expired");
        const decoded = yield jsonwebtoken_1.default.verify(refresh_token, constant_1.default.JWT_SECRET);
        const user = yield entity_1.default.findOne({ where: { id: decoded.id } });
        user.access_token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, constant_1.default.JWT_SECRET, { expiresIn: "5m" });
        yield user.save();
        res.status(200).json(user);
    }
    catch (e) {
        next(e);
    }
});
exports.refreshAccess = refreshAccess;
exports.default = isAuth;
