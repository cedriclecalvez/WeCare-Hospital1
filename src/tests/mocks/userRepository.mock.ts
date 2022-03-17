import User from "../../modules/User/dto";


export default class UserRepositoryMock {
  users: User[];
  constructor() {
    this.users = [];
  }

  async findAll() {
    return this.users;
  }

  //   async findOne(email) {
  //     return await this.manager.findOne(User, {email: email});
  //   }

  async addNew(user: User) {
    this.users.push(user);

    return user;
  }

  async findByEmail(email: string) {
    const users = this.users.filter((user) => user.email === email);
    return users[0];
  }

  compareHash = (password: string, hash: string) => password
}
