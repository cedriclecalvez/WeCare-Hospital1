import jwt from 'jsonwebtoken';
import User from './model';
import ApiError from '../../helpers/ApiError';
import config from '../../config/constant';

const userController = {
  getAll: async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.status(200).json({ user: req.user, users });
    } catch (err) {
      next(err);
    }
  },
  register: async (req, res, next) => {
    try {
      const user = await User.create({ ...req.body });
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = { ...req.body };

      const user = await User.findOne({
        where: { email, password },
      });

      if (!user)
        throw new ApiError(
          400,
          'unable to find user with the spécified pair email/password'
        );

      user.access_token = jwt.sign(
        { id: user.id, email: user.email },
        config.jwt_secret,
        { expiresIn: '5m' }
      );
      user.refresh_token = jwt.sign({ id: user.id }, config.jwt_secret, {
        expiresIn: '60d',
      });

      await user.save();

      res.cookie('refresh_token', user.refresh_token, {
        expiresIn: '60d',
        httpOnly: true,
      });
      res.status(200).json({ token: user.access_token });
    } catch (err) {
      next(err);
    }
  },
};

export default userController;
