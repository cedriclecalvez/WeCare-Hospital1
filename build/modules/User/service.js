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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dto_1 = __importDefault(require("./dto"));
const ApiError_1 = __importDefault(require("../../helpers/ApiError"));
const constant_1 = __importDefault(require("../../config/constant"));
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            // findAll method
            const users = yield this.userRepository.findAll();
            console.log("users====>", users);
            return users.map((user) => new dto_1.default(user));
        });
    }
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = Object.assign({}, userData);
            if (!email || !password) {
                throw new ApiError_1.default(403, "missing email or password or both");
            }
            const isUserExist = yield this.userRepository.findByEmail(email);
            // return isUserExist || 'email does not exist'
            if (isUserExist) {
                throw new ApiError_1.default(409, "This user already exist !");
            }
            else {
                const newUser = yield this.userRepository.addNew(userData);
                return new dto_1.default(newUser);
            }
        });
    }
    // login service
    login(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = Object.assign({}, userData);
            console.log("email===", email);
            if (!email || !password) {
                throw new ApiError_1.default(403, "missing email or password or both");
            }
            const user = yield this.userRepository.findByEmail(email);
            if (!user)
                throw new ApiError_1.default(400, "unable to find user");
            const passwordMatch = yield this.userRepository.compareHash(userData.password, user.password);
            if (!passwordMatch)
                throw new ApiError_1.default(403, "User password do not match");
            user.access_token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, constant_1.default.JWT_SECRET, { expiresIn: "24h" });
            user.refresh_token = jsonwebtoken_1.default.sign({ id: user.id }, constant_1.default.JWT_SECRET, {
                expiresIn: "60d",
            });
            yield user.save();
            return new dto_1.default(user);
        });
    }
}
exports.default = UserService;
