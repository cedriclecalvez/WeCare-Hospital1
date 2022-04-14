import jwt from "jsonwebtoken";
import UserDTO, { PractitionerDTO,PatientDTO } from "./dto";
import ApiError from "../../helpers/ApiError";
import {IUserRepository} from "./UserRepository";
import config from "../../config/constant";
import { patientType, practitionerType } from "../../types/entitiesTypes";


export default class UserService {
  userRepository: IUserRepository;
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async getAllPractitioners() {
    const practitioner: practitionerType[] = await this.userRepository.findAllPractitioner()
    return practitioner.map((practitioner: practitionerType)=> new PractitionerDTO(practitioner))
  }

  async getAllUsers() {
    // findAll method
    const users: any= await this.userRepository.findAllUser();
    console.log("users in getAll()====>", users);

    return users.map((user: any) => new UserDTO(user));
  }

  async getAllPatients(){
    const patients: patientType[] = await this.userRepository.findAllPatient();
    return patients.map((patient: patientType)  => new PatientDTO(patient))
  }

  async registerPatient(patientData: patientType){
    try {
      
      const { firstName, lastName,securitySocialNumber, User } = { ...patientData }
      const data = {
        id: null,
        firstName: firstName,
        lastName: lastName,
        securitySocialNumber: securitySocialNumber,
        User: User
      }
      console.log(data);
      

      if(!firstName){
        throw "no firstname"
      }
      if(!lastName){
        throw "no lastname"
      }
      if(!securitySocialNumber){
        throw "no security social number"
      }
      if(!User){
        throw "no user id"
      }

      if(firstName && lastName && securitySocialNumber && User){
        const isUserExist = await this.userRepository.findByUserID(User);
        console.log(isUserExist);
        
        if(isUserExist){
          console.log('Add new patient');
          
          const newPatient: patientType = await this.userRepository.addNewPatient(data)
          return new PatientDTO(newPatient)
        }
      }

    } catch (error) {
      return `Error : ${error}`
    }
    
  }

  async register(userData: { email: string; password: string }) {
    const { email, password } = { ...userData };

    if (!email || !password) {
      throw new ApiError(403, "missing email or password or both");
    }

    const isUserExist: any = await this.userRepository.findByEmail(email);
    // return isUserExist || 'email does not exist'
    if (isUserExist) {
      throw new ApiError(409, "This user already exist !");
    } else {
      const newUser: any = await this.userRepository.addNew(userData);

      return new UserDTO(newUser);
    }
  }

  // login service
  async login(userData: { email: string; password: string }) {
    const { email, password } = { ...userData };
    console.log("email===", email);

    if (!email || !password) {
      throw new ApiError(403, "missing email or password or both");
    }

    const user: any = await this.userRepository.findByEmail(email);
    if (!user) throw new ApiError(400, "unable to find user");

    const passwordMatch = await this.userRepository.compareHash(userData.password, user.password);
    if (!passwordMatch) throw new ApiError(403, "User password do not match");
    

    user.access_token = jwt.sign(
      { id: user.id, email: user.email },
      config.JWT_SECRET,
      { expiresIn: "24h" }
    );
    user.refresh_token = jwt.sign({ id: user.id }, config.JWT_SECRET, {
      expiresIn: "60d",
    });

    await user.save();
    
    return new UserDTO(user)
  }
}
