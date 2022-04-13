export default class UserDTO {
    id: any;
    email: string;
    access_token: string | null;
    refresh_token: string | null;
    constructor({id,email,access_token=null,refresh_token=null}: {id: any, email: string, access_token: string | null, refresh_token: string | null}){
        this.id = id
        this.email = email
        this.access_token = access_token        
        this.refresh_token = refresh_token        
    }
}

export class PractitionerDTO {
    id: string | null;
    firstName: string;
    lastName: string;
    cps: number;
    User:string;
    constructor({id,firstName,lastName,cps,User}: {id: string | null, firstName: string, lastName: string, cps: number, User: string}){
        this.id = id,
        this.firstName = firstName,
        this.lastName = lastName,
        this.cps = cps,
        this.User = User
    }
}

export class PatientDTO {
    id: string | null;
    firstName: string;
    lastName: string;
    securitySocialNumber: number;
    User:string;
    constructor({id,firstName,lastName,securitySocialNumber,User}: {id: string | null, firstName: string, lastName: string, securitySocialNumber: number, User: string}){
        this.id = id,
        this.firstName = firstName,
        this.lastName = lastName,
        this.securitySocialNumber = securitySocialNumber,
        this.User = User
    }
}