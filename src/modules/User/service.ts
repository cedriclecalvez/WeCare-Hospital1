import jwt from "jsonwebtoken";
import UserDTO from "./dto";
import ApiError from "../../helpers/ApiError";
import {IUserRepository} from "./UserRepository";
import config from "../../config/constant";

export default class UserService {
  userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async getAll() {
    // findAll method
    const users: any= await this.userRepository.findAll();
    console.log("users in getAll()====>", users);

    return users.map((user: any) => new UserDTO(user));
  }

  async register(userData: { email: string; password: string }) {
    const { email, password } = { ...userData };

    if (!email || !password) {
      throw new ApiError(403, "missing email or password or both");
    }

    const isUserExist: any = await this.userRepository.findByEmail(email);
    // return isUserExist || 'email does not exist'
    if (isUserExist) {
      throw new ApiError(409, "This user already exist !");
    } else {
      const newUser: any = await this.userRepository.addNew(userData);

      return new UserDTO(newUser);
    }
  }

  // login service
  async login(userData: { email: string; password: string }) {
    const { email, password } = { ...userData };
    console.log("email===", email);

    if (!email || !password) {
      throw new ApiError(403, "missing email or password or both");
    }

    const user: any = await this.userRepository.findByEmail(email);
    if (!user) throw new ApiError(400, "unable to find user");

    const passwordMatch = await this.userRepository.compareHash(userData.password, user.password);
    if (!passwordMatch) throw new ApiError(403, "User password do not match");
    

    user.access_token = jwt.sign(
      { id: user.id, email: user.email },
      config.JWT_SECRET,
      { expiresIn: "24h" }
    );
    user.refresh_token = jwt.sign({ id: user.id }, config.JWT_SECRET, {
      expiresIn: "60d",
    });

    await user.save();
    
    return new UserDTO(user)
  }
}
