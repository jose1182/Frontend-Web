import { Disponibilidad } from '../components/crear-servicio/enums/disponibilidad.model';
import * as dayjs from 'dayjs';
import { ICategoria } from './categoria.model';
import { IUsuario } from './usuario.model';

export interface IServicio {
  id?: number;
  titulo?: string;
  descripcion?: string;
  disponibilidad?: Disponibilidad,
  preciohora?: number,
  preciotraslado?: number;
  fechacreacion?: dayjs.Dayjs;
  fechaactualizacion?: dayjs.Dayjs;
  destacado?: boolean;
  usuario?: IUsuario | null;
  categorias?: ICategoria[] | null
}

export class Servicio implements IServicio {
  constructor(
    public id?: number,
    public titulo?: string,
    public descripcion?: string,
    public disponibilidad?: Disponibilidad,
    public preciohora?: number,
    public preciotraslado?: number,
    public fechacreacion?: dayjs.Dayjs,
    public fechaactualizacion?: dayjs.Dayjs,
    public destacado?: boolean,
    public usuario?: IUsuario | null,
    public categorias?: ICategoria[] | null
  ){
    this.destacado = this.destacado ?? false;
  }
}

export  function getServicioId(servicio: IServicio): number | undefined {
  return servicio.id;
}
