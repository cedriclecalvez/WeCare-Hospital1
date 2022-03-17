import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/constant";
import ApiError from "../helpers/ApiError";
import User from "../modules/User/entity";
import { getManager } from "typeorm";

const isAuth = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) throw new ApiError(401, "missing authorization header");

    let access_token = req.headers.authorization.split(" ")[1];
    if (!access_token) throw new ApiError(401, "missing refresh_token");

    // const refresh_token = req.cookies.refresh_token;
    // if (!refresh_token)
    //   return res.status(401).json("Access denied. Your session expired");
    const entityManager = getManager();
    let user = await entityManager.findOne(User, { access_token });
    console.log("findOne a user:    =>   ", user);
    if (!user)
      return res.status(401).json("1:Access denied. Your session expired");

    // const decoded = await jwt.verify(access_token, config.JWT_SECRET);
    await jwt.verify(access_token, config.JWT_SECRET);

    req.user = user;
    // req.userID = decoded.id;
    next();
  } catch (error) {
    res.status(401).json("2:Access denied. Your session expired");
  }
};

const refreshAccess = async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    const { refresh_token } = req.cookies;
    console.log("req.cookies", req.cookies);

    if (!refresh_token)
      return res.status(401).json("4:Access denied. Your session expired");

    const decoded: any = await jwt.verify(refresh_token, config.JWT_SECRET);

    const user: any = await User.findOne({ where: { id: decoded.id } });

    user.access_token = jwt.sign(
      { id: user.id, email: user.email },
      config.JWT_SECRET,
      { expiresIn: "5m" }
    );
    await user.save();
    // console.log(user);
    
    res.header("Authorization", `Bearer ${user.access_token}`);
    res.status(200).json()
    // res.status(200).json(`Bearer ${user.access_token}`);
  } catch (e) {
    next(e);
  }
};

const logout = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refresh_token } = req.cookies;
    console.log("req.cookies", req.cookies);

    if (!refresh_token)
      return res.status(401).json("4:Access denied. Your session expired");

    res.cookie("refresh_token", "", {
      httpOnly: true,
    });

    const decoded: any = await jwt.verify(refresh_token, config.JWT_SECRET);
    const user: any = await User.findOne({ where: { id: decoded.id } });
    user.access_token = "";
    user.refresh_token = "";

    await user.save();
    res.removeHeader("Authorization");
    res.status(200).json();
  } catch (e) {
    next(e);
  }
};

export default isAuth;
export { refreshAccess, logout };
