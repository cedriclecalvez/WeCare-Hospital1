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
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    constructor(userService) {
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let users = yield this.userService.getAll();
                res.status(200).json({ user: users });
            }
            catch (err) {
                next(err);
            }
        });
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.register(Object.assign({}, req.body));
                res.status(201).json(user);
            }
            catch (err) {
                next(err);
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.login(Object.assign({}, req.body));
                res.header("Authorization", `Bearer ${user.access_token}`);
                // res.cookie("refresh_token", user.refresh_token, {
                //   httpOnly: true,
                //   expiresIn: "24h",
                // });
                res.status(200).json({ token: user.access_token });
            }
            catch (err) {
                next(err);
            }
        });
        this.userService = userService;
    }
}
exports.default = UserController;
