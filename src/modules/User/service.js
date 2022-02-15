import UserDTO from "./dto";
import ApiError  from "../../helpers/ApiError";
// import {UserRepository} from "./UserRepository"

export default class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAll() {
    // findAll method
    const users = await this.userRepository.findAll();

    return users.map((user) => new UserDTO(user));
  }

  async register(userData) {
    // if (!userData.email || !userData.password)
    //     throw new ApiError(400, 'Missing required email and password fields');

    // const newUser = await this.userRepo.addNew(userData);
    // await this.mailerService.sendMail(userData);
    // return new UserDTO(newUser);

    const { email, password } = { ...userData };
    console.log("email===",email);


    if (!email || !password) {
      throw new ApiError(403, "missing email or password or both");
    }

    const isUserExist = await this.userRepository.findByEmail(email);
    // return isUserExist || 'email does not exist'
    if (isUserExist) {
      throw new ApiError(409, "This user already exist !");
    } else {
      const newUser = await this.userRepo.addNew(userData);
      //   res.status(201).json(user);
      return new UserDTO(newUser);
    }
  }
}
