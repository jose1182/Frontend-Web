import { IUsuario } from './usuario.model';
import { ICategoria } from './categoria.model';
export class servicioDesModel {

    public id! : Number;
    public titulo!: String;
    public descripcion!: String;
    public usuario!: IUsuario;
    public categoria!: ICategoria[];

    constructor(id: Number, titulo: String, usuario: IUsuario, categoria: ICategoria[], descripcion: String){
      this.id = id;
      this.titulo = titulo;
      this.usuario = usuario;
      this.categoria = categoria;
      this.descripcion = descripcion;
    }

  }
