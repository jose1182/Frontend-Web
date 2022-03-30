import { CategoriaModel } from './categoria.model';
import { UsuarioModel } from './usuario.model';
export class ServicioModel {

  id!: Number;
  titulo!: String;
  descripcion!: String;
  disponibilidad!: String;
  preciohora!: Number;
  preciotraslado!: Number;
  usuario!: UsuarioModel;
  categorias!: CategoriaModel[]
}
