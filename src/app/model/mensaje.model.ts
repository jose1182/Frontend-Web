import { IUsuario, Usuario } from "./usuario.model";
import * as dayjs from 'dayjs';
import { Conversacion } from "./conversacion.model";

export interface IMensaje {
    id?: number;
    texto?: string;
    fecha?: dayjs.Dayjs;
    emisor?: IUsuario;
    receptor?: IUsuario;
    conversacion?: Conversacion;
}

export class MensajeModel implements IMensaje{

    constructor(
        public id?: number, 
        public fecha?: dayjs.Dayjs, 
        public emisor?: IUsuario, 
        public receptor?: IUsuario, 
        public conversacion?: Conversacion) {

    }
}