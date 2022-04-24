export class CategoriaModel {

  public id! : Number;
  public nombre!: String;
  public imagen!: String;
  public imagenContentType!: String

  constructor(id: Number, nombre: String, imagen: String, imagenContentType: String){
    this.id = id;
    this.nombre = nombre;
    this.imagen = imagen;
    this.imagenContentType = imagenContentType;
  }

}
