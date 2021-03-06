import * as dayjs from 'dayjs'

import { IUser } from './user.model';
import { IConversacion } from './conversacion.model';

export interface IUsuario {
  id?: number;
  nombre?: string;
  apellidos?: string | null;
  correo?: string;
  dni?: string;
  direccion?: string;
  localidad?: string;
  provincia?: string;
  profesion?: string | null;
  fn?: dayjs.Dayjs;
  fechaRegistro?: dayjs.Dayjs | null;
  imagenContentType?: string | null;
  imagen?: string | null;
  user?: IUser | null;
  conversacions?: IConversacion[] | null;
}

export class Usuario implements IUsuario {
  constructor(
    public id?: number,
    public nombre?: string,
    public apellidos?: string | null,
    public correo?: string,
    public dni?: string,
    public direccion?: string,
    public localidad?: string,
    public provincia?: string,
    public profesion?: string | null,
    public fn?: dayjs.Dayjs,
    public fechaRegistro?: dayjs.Dayjs | null,
    public imagenContentType?: string | null,
    public imagen?: string | null,
    public user?: IUser | null,
    public conversacions?: IConversacion[] | null
  ) {}
}

export function getUsuarioIdentifier(usuario: IUsuario): number | undefined {
  return usuario.id;
}

export function updateConversacions(usuario: IUsuario, conversacion: IConversacion){
  if(usuario.conversacions){
    usuario.conversacions.push(conversacion)
  }
}
