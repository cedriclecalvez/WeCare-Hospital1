import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ApiError from "../../helpers/ApiError";
import config from "../../config/constant";
import IUserService from "./service";
import { NextFunction, Request, Response } from "express";



export interface IUserController {
  userService: IUserService;
  getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
  register(req: Request, res: Response, next: NextFunction): Promise<void>;
  login(req: Request, res: Response, next: NextFunction): Promise<void>
}

export default class UserController implements IUserController {
  userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let users = await this.userService.getAll();

      res.status(200).json({ user: users });
    } catch (err) {
      next(err);
  
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.register({ ...req.body });
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.login({...req.body})

      res.header("Authorization", `Bearer ${user.access_token}`);
      // res.cookie("refresh_token", user.refresh_token, {
      //   httpOnly: true,
      //   expiresIn: "24h",
      // });
      res.status(200).json({ token: user.access_token });
    } catch (err) {
      next(err);
    }
  };
}
