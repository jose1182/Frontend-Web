import { IUsuario } from './usuario.model';
import { IServicio, Servicio } from './servicio.model';

export interface IFavorito {
  id?: number;
  usuario?: IUsuario;
  servicio?: IServicio;
}
export class Favoritos implements IFavorito {

  constructor(
    public id? : number,
    public usuario?: IUsuario,
    public servicio?: Servicio){}

  }