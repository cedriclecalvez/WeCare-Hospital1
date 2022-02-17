"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (controller) => {
    const router = (0, express_1.Router)();
    router.route("/auth/register").post(controller.register);
    // router.route('/auth/alluser').get(controller.getAll);
    // router.route('/auth/refresh').get(refreshAccess);
    router.route('/auth/login').post(controller.login);
    router.route("/allUsers").get(controller.getAll);
    // router.route("/allUsers").get(isAuth, controller.getAll);
    //   router.route("/allUsers").get(controller.getAll);
    return router;
};
exports.default = router;
