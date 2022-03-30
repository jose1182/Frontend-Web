export class UsuarioModel {

  id!: Number;
  nombre!: String;
  apellidos!: String;
  correo!: String;
  dni!: String;
  direccion!: String;
  localidad!: String;
  provincia!: String;
  profesion!: String;
  fn!: string;
  fechaRegistro!: String;
  user!: { id: Number, login: String };
  conversacions!: []

}
