import UserController from './controller';
import User from './model';
import router from './router';

const models = User;
console.log("models:",models);

const controller = new UserController(models);
const routesUser = router(controller);

export default routesUser;
