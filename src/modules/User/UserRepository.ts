import bcrypt from "bcrypt";
import { EntityRepository, EntityManager } from "typeorm";
import User from "./entity";
import { PatientEntity, practitionerEntity } from "./entity";
import { patientType,practitionerType,userType } from "../../types/entitiesTypes";

export interface IUserRepository {
  findAllUser(): Promise<userType[]>;
  findAllPractitioner(): Promise<practitionerType[]>;
  findAllPatient(): Promise<patientType[]>;
  addNew({ email, password }: any): Promise<any>;
  addNewPatient(patient: patientType):  Promise<{ firstName: string; lastName: string; securitySocialNumber: number; User: string; } & PatientEntity> ;
  findByEmail(email: string): Promise<any | undefined>;
  findByUserID(id: string): Promise< {} | undefined>
  compareHash(password: string, hash: string): any;
}

@EntityRepository()
// class UserRepository implements IUserRepository {
class UserRepository  {
  //    super()
  constructor(private manager: EntityManager) {}

  async findAllUser() {
    return await this.manager.find(User);
  }

  async findAllPatient() {
    return await this.manager.find(PatientEntity)
  }

  async findAllPractitioner(){
    return await this.manager.find(practitionerEntity)
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

  async addNewPatient({firstName, lastName, securitySocialNumber,User}: patientType){
    return await this.manager.save(PatientEntity,{
      firstName,
      lastName,
      securitySocialNumber,
      User
    })
  }

  async findByEmail(email: string) {
    return await this.manager.findOne(User, { where: { email: email } });
  }

  async findByUserID(id: string){
    return await this.manager.findOne(User, {where: { id: id}})
  }

  compareHash = async (password: string | Buffer, hash: string) =>
    await bcrypt.compareSync(password, hash);
}

export default UserRepository;
