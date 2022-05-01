import { CategoriaModel } from './categoria.model';
import { Usuario } from './usuario.model';
export class ServicioModel {

  id!: number;
  titulo!: String;
  descripcion!: String;
  disponibilidad!: String;
  preciohora!: Number;
  preciotraslado!: Number;
  usuario!: Usuario;
  categorias!: CategoriaModel[]
}
