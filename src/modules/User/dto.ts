export default class UserDTO {
    id: any;
    email: string;
    access_token: string | null;
    constructor({id,email,access_token=null}: {id: any, email: string, access_token: string | null}){
        this.id = id
        this.email = email
        this.access_token = access_token        
    }
}