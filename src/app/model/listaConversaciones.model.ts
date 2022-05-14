import { IMensaje } from "./mensaje.model";
import { IUsuario } from "./usuario.model";

export interface IConversacionsList {
    id?: number;
    mensaje?: IMensaje;
    usuario?: IUsuario;
  }
  
  export class ConversacionsList implements IConversacionsList {
    constructor(
        public id?: number,
        public mensaje?: IMensaje,
        public usuario?:IUsuario
        ) {}
  }
  
  export function getConversacionIdentifier(conversacionsList: IConversacionsList): number | undefined {
    return conversacionsList.id;
  }