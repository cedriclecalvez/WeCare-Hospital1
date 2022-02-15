export default class UserDTO {
    constructor({id,email,access_token=null}){
        this.id= id
        this.email=email
        this.access_token=access_token        
    }
}