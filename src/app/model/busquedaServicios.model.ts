import { UsuarioModel } from './usuario.model';
import { CategoriaModel } from './categoria.model';
export interface BusquedaServicios {
  id: Number | null;
  titulo: String;
  descripcion: String;
  disponibilidad: String;
  preciohora: Number | null;
  preciotraslado: Number | null;
  usuario: UsuarioModel | null;
  categorias: CategoriaModel[]
}
