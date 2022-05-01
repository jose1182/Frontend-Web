import { ServicioModel } from './servicio.model';
import { Usuario } from "./usuario.model";


export class ContratoModel {
    id!: Number;
    preciofinal!: Number;
    fecha!: String;
    usuario!: Usuario;
    servicio!: ServicioModel;
}