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
const constant_1 = __importDefault(require("./constant"));
class Server {
    constructor(app) {
        this.app = app;
    }
    connecte(db) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // await db.associateAll(db.sequelize.models)
                yield db.connect();
                console.log('[App]: Connected to Bdd');
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    middlewares(middlewares) {
        for (const key in middlewares) {
            this.app.use(middlewares[key]);
        }
    }
    routes(routes) {
        for (const path in routes) {
            this.app.use(`${constant_1.default.API_VERSION}${path}`, routes[path]);
        }
    }
    errorHandler(errorHandler) {
        this.app.use(errorHandler);
    }
    start(port) {
        this.app.listen(port, () => {
            console.log(`[App]: Listening on PORT ${port}`);
        });
    }
}
exports.default = Server;
