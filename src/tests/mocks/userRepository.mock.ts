import { EntityManager, EntityRepository } from "typeorm";
import { IUserRepository } from "../../modules/interfaces/user.interface";
import { UserDTO } from "../../modules/User/dto";
import { PatientEntity, practitionerEntity } from "../../modules/User/entity";

import {
  patientType,
  practitionerType,
  userType,
} from "../../types/entitiesTypes";

@EntityRepository()
export default class UserRepositoryMock implements IUserRepository {
  users: UserDTO[] = [];

  findByUserID(id: string): Promise<{} | undefined> {
    throw new Error("Method not implemented.");
  }  
  async findAllUser() {
    return this.users;
  }
  async addNew(user: UserDTO) {
    this.users.push(user);
    return user;
  }
  async findByEmail(email: string) {
    const users = this.users.filter((user) => user.email === email);
    return users[0];
  }
  compareHash = (password: string, hash: string) => password;

  addNewPatient(
    patient: patientType
  ): Promise<{firstName: string;lastName: string;securitySocialNumber: number;User: string;} & PatientEntity> {
    throw new Error("Method not implemented.");
  }
  findAllPractitioner(): Promise<practitionerType[]> {
    throw new Error("Method not implemented.");
  }
  findAllPatient(): Promise<patientType[]> {
    throw new Error("Method not implemented.");
  }

}
