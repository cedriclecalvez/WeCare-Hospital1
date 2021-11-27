import jwt from "jsonwebtoken";
import config from "../config/constant";
import ApiError from "../helpers/ApiError";
import User from "../modules/User/model";

const isAuth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) throw new ApiError(401, "missing authorization header");

    let access_token = req.headers.authorization.split(" ")[1];
    if (!access_token) throw new ApiError(401, "missing refresh_token");

    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token)
      return res.status(401).json("Access denied. Your session expired");

    let user = await User.findOne({ where: { access_token, refresh_token } });
    console.log("findOne a user:    =>   ", user);
    if (!user)
      return res.status(401).json("Access denied. Your session expired");

    // const decoded = await jwt.verify(access_token, config.JWT_SECRET);
    await jwt.verify(access_token, config.JWT_SECRET);

    req.user = user;
    // req.userID = decoded.id;
    next();
  } catch (error) {
    res.status(401).json("Access denied. Your session expired");
  }
};

const refreshAccess = async (req, res, next) => {
  try {
    const { refresh_token } = req.cookies;

    if (!refresh_token)
      return res.status(401).json("4:Access denied. Your session expired");

    const decoded = await jwt.verify(refresh_token, config.JWT_SECRET);
    const user = await User.findOne({ where: { id: decoded.id } });
    user.access_token = jwt.sign(
      { id: user.id, email: user.email },
      config.JWT_SECRET,
      { expiresIn: "5m" }
    );
    await user.save();

    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

export default isAuth;
export { refreshAccess };
