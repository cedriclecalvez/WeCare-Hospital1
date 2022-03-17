import bcrypt from "bcrypt";
import { EntityRepository, Repository, EntityManager } from "typeorm";
import User from "./entity";

export interface IUserRepository {
  findAll(): any;
  addNew({ email, password }: any): Promise<any>;
  findByEmail(email: string): Promise<any | undefined>;
  compareHash(password: string, hash: string): any;
}

@EntityRepository()
// class UserRepository implements IUserRepository {
class UserRepository  {
  //    super()
  constructor(private manager: EntityManager) {}

  async findAll() {
    return await this.manager.find(User);
  }

  //   async findOne(email) {
  //     return await this.manager.findOne(User, {email: email});
  //   }

  async addNew({ email, password }: any) {
   

    const passHash = await bcrypt.hash(password, 10);
    console.log("password hashed: ", passHash);

    return await this.manager.save(User, {
      email,
      password: passHash,
      access_token: "",
      refresh_token: ""
    });
  }

  async findByEmail(email: string) {
    return await this.manager.findOne(User, { where: { email: email } });
  }

  compareHash = async (password: string | Buffer, hash: string) =>
    await bcrypt.compareSync(password, hash);
}

export default UserRepository;
