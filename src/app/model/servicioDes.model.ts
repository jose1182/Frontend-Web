import { IUsuario } from './usuario.model';
import { CategoriaModel } from './categoria.model';
export class servicioDesModel {

    public id! : Number;
    public titulo!: String;
    public descripcion!: String;
    public usuario!: IUsuario;
    public categoria!: CategoriaModel[];

    constructor(id: Number, titulo: String, usuario: IUsuario, categoria: CategoriaModel[], descripcion: String){
      this.id = id;
      this.titulo = titulo;
      this.usuario = usuario;
      this.categoria = categoria;
      this.descripcion = descripcion;
    }

  }
