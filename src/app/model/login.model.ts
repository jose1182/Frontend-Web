export class LoginModel {

  public username! : String;
  public password!: String;
  public remenberMe!: boolean;

  constructor(username: String, password: String, remenberMe: boolean){
    this.username = username;
    this.password = password;
    this.remenberMe = remenberMe;
  }

}
