import { patientType, practitionerType, userType } from "../../types/entitiesTypes";
import User from "../User/entity";
import { PatientEntity } from "../User/entity";

export interface IUserRepository {
    findAllUser(): Promise<any[]>;
    findAllPractitioner(): Promise<practitionerType[]>;
    findAllPatient(): Promise<patientType[]>;
    addNew({ email, password }: any): Promise<any>;
    addNewPatient(patient: patientType):  Promise<{ firstName: string; lastName: string; securitySocialNumber: number; User: string; } & PatientEntity> ;
    findByEmail(email: string): Promise<any | undefined>;
    findByUserID(id: string): Promise< {} | undefined>
    compareHash(password: string, hash: string): any;
  }