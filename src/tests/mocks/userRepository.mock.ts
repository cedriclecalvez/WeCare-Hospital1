import User from "../../modules/User/dto";
import { PatientEntity, practitionerEntity } from "../../modules/User/entity";

import { patientType,practitionerType,userType } from "../../types/entitiesTypes";

export interface IUserRepository {
  // findAll(): any;
  addNew({ email, password }: any): Promise<any>;
  findByEmail(email: string): Promise<any | undefined>;
  compareHash(password: string, hash: string): any;
  findByUserID(id: string): Promise< {} | undefined>
  addNewPatient(patient: patientType):  Promise<{ firstName: string; lastName: string; securitySocialNumber: number; User: string; } & PatientEntity> ;
  findAllUser(): Promise<userType[]>;
  findAllPractitioner(): Promise<practitionerType[]>;
  findAllPatient(): Promise<patientType[]>;

}

export default class UserRepositoryMock {
  users: User[];
  
  constructor() {
    this.users = [];
  }

  async findAllUser() {
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
