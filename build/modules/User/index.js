"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const UserRepository_1 = __importDefault(require("./UserRepository"));
const service_1 = __importDefault(require("./service"));
const controller_1 = __importDefault(require("./controller"));
const router_1 = __importDefault(require("./router"));
const userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.default);
const userService = new service_1.default(userRepository);
const userController = new controller_1.default(userService);
const userRouter = (0, router_1.default)(userController);
exports.default = userRouter;
