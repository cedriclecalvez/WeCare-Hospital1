import bcrypt from 'bcrypt';
import { EntityRepository, Repository, EntityManager} from "typeorm";
import User from "./entity";

// interface IUserDao {
//     findAll():  Promise<void>,
//     create({email, password}): any, 
//     findOne(any): any
// }

export interface IUserRepository {
    findAll(): Promise<User[] | undefined>,
    addNew({email, password}: any): Promise<any>,
    findByEmail(email: string): Promise<any | undefined> 
    compareHash(password: string, hash: string): Promise<Boolean>
}

@EntityRepository()
class UserRepository implements IUserRepository {
//    super()
    constructor(private manager: EntityManager) {
       
    }
    
    async findAll() {
        return await this.manager.find(User);
    }
    async findOne() {
        return await this.manager.findOne(User,1);
    }
    
    async addNew({email, password}: any) {
    console.log("email addNew===",email);

        const passHash = await bcrypt.hash(password, 10);
        console.log("password hashed: ", passHash);

        return await this.manager.save(User,{
            email,
            password: passHash,
            access_token: ''
        });
    }

    async findByEmail(email: string) {
        return await this.manager.findOne(User,{  where: {email: email} });
    }

    compareHash = async (password: string | Buffer, hash: string) => await bcrypt.compareSync(password, hash);
}

export default UserRepository;
