//formulario de contacto
export class RegistroModel {
   public login!: String;
   public email!: String;
   public password!: String;

    constructor(login: String, email: String,  password: String) {
      this.login = login;
      this.email = email;
      this.password = password
     }

}
