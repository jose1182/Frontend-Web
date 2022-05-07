import { Usuario } from "./usuario.model";
import * as dayjs from 'dayjs';

export class MensajeModel {
    id!: number;
    texto!: string;
    fecha!: dayjs.Dayjs;
    emisor!: Usuario;
    receptor!: Usuario;

    constructor(id: number, fecha: dayjs.Dayjs, emisor: Usuario, receptor: Usuario) {
        this.id = id;
        this.fecha = fecha;
        this.emisor = emisor;
        this.receptor = receptor;
    }
}