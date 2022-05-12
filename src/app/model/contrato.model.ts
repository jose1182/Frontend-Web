import { Usuario, IUsuario } from './usuario.model';
import * as dayjs from 'dayjs';
import { IServicio } from "./servicio.model";

export interface IContrato {
  id?: number;
  preciofinal?: number;
  fecha?: dayjs.Dayjs;
  usuario?: IUsuario | null;
  servicio?: IServicio | null;
}

export class Contrato implements IContrato {
  constructor(
    public id?: number,
    public preciofinal?: number,
    public fecha?: dayjs.Dayjs,
    public usuario?: IUsuario | null,
    public servicio?: IServicio | null
  ) {}
}

export function getContratoIdentifier(contrato: IContrato): number | undefined {
  return contrato.id;
}
