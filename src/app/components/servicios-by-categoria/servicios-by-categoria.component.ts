import { Busqueda } from './../../model/busqueda.model';
import { ServiciosService } from './../../services/servicios/servicios.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ServicioModel } from '../../model/servicio.model';
import { BusquedaServicio } from '../../model/busquedaServicio.model';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { CategoriaModel } from '../../model/categoria.model';
import { BusquedaServicios } from '../../model/busquedaServicios.model';

@Component({
  selector: 'app-servicios-by-categoria',
  templateUrl: './servicios-by-categoria.component.html',
  styleUrls: ['./servicios-by-categoria.component.css']
})
export class ServiciosByCategoriaComponent implements OnInit {

  initialized = false;
  id!: number
  usuarioElegido: any = null;
  categoriaElegido: any = null;

  activaFindByCategory: boolean = false;

  usuarios: any = null;
  categoriasFilter: any = null;
  servicios!: ServicioModel[];
  categorias!: CategoriaModel[];

  busquedaServicio: BusquedaServicio = {
    parameter: [],
    value: [],
  };

  //comporbar si es necesario !!!!!!!!!!!!!!!!!!!!!!!!
  busqueda : Busqueda = {
    parameter: "",
    value: null,
  };

  constructor(
    private  route: ActivatedRoute,
    private serviciosService:ServiciosService,
    private categoriasService: CategoriaService,
    ) {

    }

  ngOnInit(): void {

    this.getQueryParams();
    this.listaServicios();
    this.listaCategorias();

  }

  getQueryParams(): void {
    this.route.paramMap.subscribe((params: Params) => {
      this.id = params.get('id');
      this.busquedaServicio.parameter.push("categoriaId.equals");
      this.busquedaServicio.value.push(this.id);
      this.busqueda.parameter = "id.equals"
      this.busqueda.value = this.id;
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

  listaCategorias(): void{
    this.categoriasService.categorias(this.busqueda).subscribe( categorias => {
      this.categorias = categorias;

    })
  }

  onChangeUsuario(): void{
    if(this.usuarioElegido){

      this.resetValues();

      //set query parameters
      this.busquedaServicio.parameter[0]= "usuarioId.equals";
      this.busquedaServicio.value[0] = this.usuarioElegido;

    } else {

      this.resetValues();
    }

    this.listaServicios();
  }

  ooChangeUsuarioCategoria() :void {
    if(this.categoriaElegido){

      this.busquedaServicio.parameter[1] = "categoriaId.equals";
      this.busquedaServicio.value[1] = this.categoriaElegido;

    } else {

      //reset parameter find by categoryId
      this.busquedaServicio.parameter[1]= "";
      //reset value find by categoryId
      this.busquedaServicio.value[1] = "";
      //reset chosen category
      this.categoriaElegido = ""
    }

    this.listaServicios();
  }

  reset() :void {
    this.activaFindByCategory = true
    this.usuarioElegido = null
    this.resetValues();
    this.listaServicios();
  }

  resetValues() :void {
    this.usuarios = []
    this.busquedaServicio.parameter = [];
    this.busquedaServicio.value = [];
    this.categoriaElegido = ""
  }

}
