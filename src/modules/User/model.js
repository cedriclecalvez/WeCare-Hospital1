import { Model, DataTypes } from 'sequelize';
import db from '../../config/database';

class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        access_token: DataTypes.TEXT,
        refresh_token: DataTypes.TEXT,
      },
      {
        sequelize,
        modelName: 'User',
      }
    );
  }

  static associate(models) {
    // define association here
    // this.hasMany(models.Book, { as: 'books' })
    return this;
  }
}

User.init(db.sequelize);

const exclude = [
  'access_token',
  'refresh_token',
  'updatedAt',
  'createdAt',
  'password',
];

User.beforeFind(async (user) => {
  user.attributes = { exclude };
});

User.beforeUpdate(async (user) => {
  user.attributes = { exclude };
});

export default User;
