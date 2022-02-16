import {getCustomRepository} from 'typeorm';
import UserRepository from "./UserRepository"
import UserService from "./service"
import UserController from './controller';
import UserRouter from './router';

const userRepository = getCustomRepository(UserRepository);
const userService = new UserService(userRepository);
const userController  = new UserController(userService);
const userRouter  = UserRouter(userController);

export default userRouter ;
