import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ApiError from "../../helpers/ApiError";
import config from "../../config/constant";
import IUserService from "./service";
import { NextFunction, Request, Response  } from "express";

export interface IUserController {
  userService: IUserService,
  getAll(req: Request, res: Response, next: NextFunction): Promise<void>,
  register(req: Request, res: Response, next: NextFunction): Promise<void>,
  // login(req: Request, res: Response, next: NextFunction): Promise<void>
}

class UserController implements IUserController{
  userService: IUserService

  constructor(userService:IUserService) {
    this.userService = userService
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const users = await this.#models.findAll();
      let users = await this.userService.getAll();

      res.status(200).json({ user: users });
    } catch (err) {
      next(err);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const { email, password } = { ...req.body };
      

      // if (!email || !password) {
      //   throw new ApiError(403, "missing email or password or both");
      // }

      // const isUserExist = await this.#models.findOne({where: { email },});

     

      // if(isUserExist) {
      //   throw new ApiError(409, "This user already exist !");
        
      // } else {
      //   const password = await bcrypt.hash(req.body.password, 10);
      //   console.log("password hashed: ", password);

      //   const user = await this.#models.create({
      //     email: req.body.email,
      //     password,
      //   });
      //   res.status(201).json(user);
      // }

      const user = await this.userService.register({...req.body});
            res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  };

  // login = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const { email, password } = { ...req.body };

  //     if (!email || !password) {
  //       throw new ApiError(403, "missing email or password or both");
  //     }

  //     let user = await this.#models.findOne({
  //       where: { email },
  //     });

  //     if (!user) throw new ApiError(400, "unable to find user");

  //     const result = await bcrypt.compare(password, user.password);
  //     if (!result) throw new ApiError(403, "email/password incorrect");

  //     user.access_token = jwt.sign(
  //       { id: user.id, email: user.email },
  //       config.JWT_SECRET,
  //       { expiresIn: "24h" }
  //     );
  //     user.refresh_token = jwt.sign({ id: user.id }, config.JWT_SECRET, {
  //       expiresIn: "60d",
  //     });

  //     await user.save();

  //     res.header("Authorization", `Bearer ${user.access_token}`);
  //     res.cookie("refresh_token", user.refresh_token, {
  //       httpOnly: true,
  //       expiresIn: "24h",
  //     });
  //     res.status(200).json({ token: user.access_token });
  //   } catch (err) {
  //     next(err);
  //   }
  // };
}

export default UserController;
