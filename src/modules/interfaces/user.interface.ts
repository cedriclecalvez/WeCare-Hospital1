import { NextFunction, Request, Response } from "express";
import {
  patientType,
  practitionerType,
  userType,
} from "../../types/entitiesTypes";
import User from "../User/entity";
import { PatientEntity } from "../User/entity";
import IUserService from "../User/service";

export interface IUserRepository {
  findAllUser(): Promise<any[]>;
  findAllPractitioner(): Promise<practitionerType[]>;
  findAllPatient(): Promise<patientType[]>;
  addNew({ email, password }: any): Promise<any>;
  addNewPatient(
    patient: patientType
  ): Promise<
    {
      firstName: string;
      lastName: string;
      securitySocialNumber: number;
      User: string;
    } & PatientEntity
  >;
  findByEmail(email: string): Promise<any | undefined>;
  findByUserID(id: string): Promise<{} | undefined>;
  compareHash(password: string, hash: string): any;
}

export interface IUserController {
  userService: IUserService;
  findAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
  findAllPractitioners(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  findAllPatients(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  register(req: Request, res: Response, next: NextFunction): Promise<void>;
  registerPatient(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  login(req: Request, res: Response, next: NextFunction): Promise<void>;
}
