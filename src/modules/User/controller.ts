import IUserService from "./service";
import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import {PatientDTO, PractitionerDTO, UserDTO} from "./dto";
import { patientType, practitionerType } from "../../types/entitiesTypes";



export interface IUserController {
  userService: IUserService;
  findAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
  findAllPractitioners(req: Request, res: Response, next: NextFunction): Promise<void>;
  findAllPatients(req: Request, res: Response, next: NextFunction): Promise<void>;
  register(req: Request, res: Response, next: NextFunction): Promise<void>;
  registerPatient(req: Request, res: Response, next: NextFunction): Promise<void>
  login(req: Request, res: Response, next: NextFunction): Promise<void>
}

export default class UserController implements IUserController {
  userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  findAllUsers = async (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction): Promise<void> => {
    try {
      let users = await this.userService.getAllUsers();
      res.status(200).json(users.map((user: any) => new UserDTO(user)));
    } catch (err) {
      next(err);
  
    }
  };

   findAllPatients = async (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction): Promise<void> => {
    try {
      let patients = await this.userService.getAllPatients()
      res.status(200).json(patients.map((patient: patientType) => new PatientDTO(patient)))
    } catch (error) {
      next(error)
    }
  }

  findAllPractitioners = async (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction): Promise<void> => {
    try {
      let practitioners = await this.userService.getAllPractitioners()
      res.status(200).json(practitioners.map(
        (practitioner: practitionerType) => new PractitionerDTO(practitioner)))
    } catch (error) {
      next(error)
    }
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.register({ ...req.body });
      res.status(201).json(new UserDTO(user));
    } catch (err) {
      next(err);
    }
  };

  registerPatient =async (req: Request, res: Response, next: NextFunction)=> {
    try {
      let patient : any = await this.userService.registerPatient(req.body)
      res.status(200).json(new PatientDTO(patient))
    } catch (error) {
      next(error)
    }
  } 

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.login({...req.body})
     
      
      const expireAt = new Date(Date.now() + (30 * 86400 * 1000))

      res.header("Authorization", `Bearer ${user.access_token}`);
      
      res.cookie('refresh_token', user.refresh_token, {
        httpOnly: true,
        expires: expireAt 
      });
      res.status(200).json({ result : "response ok"});
      res.end()
    } catch (err) {
      next(err);
    }
  };
}
