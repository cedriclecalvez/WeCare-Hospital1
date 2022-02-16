import { Router } from "express";
import UserController from './controller';
// import isAuth from "../../middlewares/auth";
import isAuth, { refreshAccess } from '../../middlewares/auth';

const router = (controller: UserController) => {
  const router = Router();

  router.route("/auth/register").post(controller.register);
  // router.route('/auth/alluser').get(controller.getAll);
  // router.route('/auth/refresh').get(refreshAccess);
  router.route('/auth/login').post(controller.login);
  router.route("/allUsers").get(isAuth, controller.getAll);
//   router.route("/allUsers").get(controller.getAll);

  return router;
};
export default router;
