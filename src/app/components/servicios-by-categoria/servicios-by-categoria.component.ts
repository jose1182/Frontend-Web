import { ServiciosService } from './../../services/servicios/servicios.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServicioModel } from '../../model/servicio.model';
import { BusquedaServicio } from '../../model/busquedaServicio.model';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { CategoriaModel } from '../../model/categoria.model';
import { BusquedaServicios } from '../../model/busquedaServicios.model';
import { Busqueda } from '../../model/busqueda.model';

@Component({
  selector: 'app-servicios-by-categoria',
  templateUrl: './servicios-by-categoria.component.html',
  styleUrls: ['./servicios-by-categoria.component.css']
})
export class ServiciosByCategoriaComponent implements OnInit {

  initialized = false;
  id!: number

  filter : BusquedaServicios = {
    usuarioElegido:  null,
    categoriaElegido: null,
    disponibilidadElegido:  null,
    contenido: true,
    todos: false
  }


  usuarios: any = null;
  categoriasFilter: any = null;
  servicios!: ServicioModel[];
  categorias!: CategoriaModel[];

  busquedaServicio: BusquedaServicio = {
    parameter: [],
    value: [],
  };


  constructor(
    private  route: ActivatedRoute,
    private serviciosService:ServiciosService,
    ) {

    }

  ngOnInit(): void {

    this.getQueryParams();
    this.listaServicios();

  }

  getQueryParams(): void {
    this.route.paramMap.subscribe((params: Params) => {
      this.id = params.get('id');
      this.busquedaServicio.parameter.push("categoriaId.equals");
      this.busquedaServicio.value.push(this.id);
    })
  }

  listaServicios(): void{
    console.log("Busqueda servicio: ", this.busquedaServicio)
    this.serviciosService.servicios(this.busquedaServicio).subscribe(servicios => {

      //saving all services
      this.servicios = servicios;

      //update user list
      this.usuarios = [...new Map(servicios.map(item => [JSON.stringify(item.usuario), item.usuario])).values()];

      //filling de categories from result of filter services
      this.categoriasFilter = [...new Map(servicios.map(item => [JSON.stringify(item.categorias[0]), item.categorias[0]])).values()];
    })
  }

  onChangeUsuario(): void{
    if(this.filter.usuarioElegido){

      this.resetValues();

      //set query parameters
      this.busquedaServicio.parameter[0]= "usuarioId.equals";
      this.busquedaServicio.value[0] = this.filter.usuarioElegido;

    } else {

      this.resetValues();
    }

    this.listaServicios();
  }

  onChangeUsuarioCategoria() :void {
    if(this.filter.categoriaElegido){

      this.busquedaServicio.parameter[1] = "categoriaId.equals";
      this.busquedaServicio.value[1] = this.filter.categoriaElegido;

    } else {

      //reset parameter find by categoryId
      this.busquedaServicio.parameter[1]= "";
      //reset value find by categoryId
      this.busquedaServicio.value[1] = "";
      //reset chosen category
      this.filter.categoriaElegido = null
    }

    this.listaServicios();
  }

  onChangeListByContenido() : void {

    if(this.filter.contenido == null){
      this.filter.todos = true;
      this.clearDisponibilidad();
    } else if (this.filter.contenido){
      this.busquedaServicio.parameter[0] = "titulo.contains";
      this.busquedaServicio.value[0] = this.filter.disponibilidadElegido;
    }else {
      this.busquedaServicio.parameter[0] = "descripcion.contains";
      this.busquedaServicio.value[0] = this.filter.disponibilidadElegido;
    }

    this.listaServicios();

  }

  clearDisponibilidad() :void {
    this.filter.disponibilidadElegido = null;
    this.resetValues()
    this.listaServicios();
  }

  onchangeFilterTodos() :void{
    this.filter.todos = null;
  }

  reset() :void {
    this.filter.usuarioElegido = null
    this.resetValues();
    this.listaServicios();
  }

  resetValues() :void {
    this.usuarios = []
    this.busquedaServicio.parameter = [];
    this.busquedaServicio.value = [];
    this.filter.categoriaElegido = null
  }

}
