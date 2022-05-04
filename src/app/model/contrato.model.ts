import { Usuario } from "./usuario.model";
import * as dayjs from 'dayjs';
import { IServicio } from "./servicio.model";
export class ContratoModel {
    id!: number;
    preciofinal!: number;
    fecha!: dayjs.Dayjs;
    usuario!: Usuario;
    servicio!: IServicio;

    constructor(id: number, preciofinal: number, fecha: dayjs.Dayjs, usuario: Usuario, servicio: IServicio) {
        this.id = id;
        this.preciofinal = preciofinal;
        this.fecha = fecha;
        this.usuario = usuario;
        this.servicio = servicio;
    }
}