import { IUsuario } from './usuario.model';
import { Servicio } from './servicio.model';
export class Favoritos {

    public id! : number;
    public usuario!: IUsuario;
    public servicio!: Servicio;

    constructor(id: number, usuario: IUsuario, servicio: Servicio){
      this.id = id;
      this.usuario = usuario;
      this.servicio = servicio;
    }
  }