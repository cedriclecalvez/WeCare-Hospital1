import UserDao from './dao';
import UserRepository from "./UserRepository"
import UserService from "./service"
import UserController from './controller';
import UserRouter from './router';

const UsersDao = UserDao;
console.log("UsersDao:",UsersDao);

const userRepository = new UserRepository(UsersDao);
const userService = new UserService(userRepository);
const userController  = new UserController(userService);
const userRouter  = new UserRouter(userController);

export default userRouter ;
