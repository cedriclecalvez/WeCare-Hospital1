import { Router } from 'express';
import userController from './controller';
import isAuth, { refreshAccess } from '../../middlewares/auth';


const router = Router();

router.route('/auth/register').post(userController.register);
router.route('/auth/alluser').get(userController.getAll);
router.route('/auth/refresh').get(refreshAccess);
router.route('/test').post(userController.login);
router.route('/auth/isAuth').get(isAuth, userController.getAll);

export default router;
