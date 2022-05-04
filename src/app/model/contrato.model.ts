import { ServicioModel } from './servicio.model';
import { Usuario } from "./usuario.model";

export class ContratoModel {
    id!: Number;
    preciofinal!: Number;
    fecha!: String;
    usuario!: Usuario;
    servicio!: ServicioModel;

    constructor(id: Number, preciofinal: Number, fecha: String, usuario: Usuario, servicio: ServicioModel){
        this.id = id;
        this.preciofinal = preciofinal;
        this.fecha = fecha;
        this.usuario = usuario;
        this.servicio = servicio;
    }
}