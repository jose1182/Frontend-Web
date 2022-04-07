import { ServiciosService } from './../../services/servicios/servicios.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServicioModel } from '../../model/servicio.model';
import { BusquedaServicio } from '../../model/busquedaServicio.model';
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

  filter : BusquedaServicios = {
    usuarioElegido:  null,
    categoriaElegido: null,
    titleOrDescription:  null,
    contenido: true,
    todos: true,
    precioDesde: null,
    precioHasta: null,
    horario: null
  }


  usuarios: any = null;
  categoriasFilter: any = null;
  servicios!: ServicioModel[];
  categorias!: CategoriaModel[];
  criteria: BusquedaServicio [] = [];


  constructor(
    private  route: ActivatedRoute,
    private router: Router,
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
      console.log("mierda: ", this.criteria)
      this.criteria.push({param: "categoriaId.equals", val: this.id})
      console.log("mierda: ", this.criteria)
    })
  }

  listaServicios(): void{

    this.serviciosService.servicios(this.criteria).subscribe(servicios => {

      //saving all services
      this.servicios = servicios;

      //update user list
      this.usuarios = [...new Map(servicios.map(item => [JSON.stringify(item.usuario), item.usuario])).values()];

      console.log("Usuarios: ", this.usuarios);

      //filling de categories from result of filter services
      this.categoriasFilter = [...new Map(servicios.map(item => [JSON.stringify(item.categorias[0]), item.categorias[0]])).values()];
    })
  }

  //using
  onChangeUsuario(): void{
    if(this.filter.usuarioElegido){

      this.resetValues();

      //set query parameters
      this.criteria.push({param: "usuarioId.equals", val: this.filter.usuarioElegido});

    } else {

      this.resetValues();
    }

    this.listaServicios();
  }

  //using
  onChangeUsuarioCategoria() :void {
    if(this.filter.categoriaElegido){

      //set query parameters
      this.criteria.push({param: "categoriaId.equals", val: this.filter.categoriaElegido});

    } else {
      this.filter.categoriaElegido = null
      this.findAndDeleteIndex("categoriaId.equals");
    }

    this.listaServicios();
  }

  //using
  onChangeListByContenido() : void {
    //reset filter todos
    //this.filter.todos = false;
    if(this.filter.contenido == null){
      //this.filter.todos = true;
      this.filter.titleOrDescription = null
    } else if (this.filter.contenido){
      this.criteria.push({param: "titulo.contains", val: this.filter.titleOrDescription});
    }else {
      this.criteria.push({param: "descripcion.contains", val: this.filter.titleOrDescription});
    }
    this.listaServicios();
  }

  //using
  onChangePrecioDesde() :void {
    if(this.filter.precioDesde){
      this.criteria.push({param: "preciohora.greaterThanOrEqual", val: this.filter.precioDesde});
    } else  {
      //this.busquedaServicio.parameter[3]= "";
      //this.busquedaServicio.value[3] = "";
    }
    this.listaServicios();
  }

  //using
  onChangePrecioHasta() :void {
    if(this.filter.precioHasta){
      this.criteria.push({param: "preciohora.lessThanOrEqual", val: this.filter.precioHasta});
    } else  {
      //this.busquedaServicio.parameter[1]= "";
      //this.busquedaServicio.value[1] = "";
    }
    this.listaServicios();
  }

  clearDisponibilidad() :void {
    this.filter.titleOrDescription = null;
  }

  findAndDeleteIndex(params: string): void{
    var index = this.criteria.map(criteria => criteria.param).indexOf(params);
    if(index > -1){
      this.criteria.splice(index, 1); // 2nd parameter means remove one item only
    }
  }

  //using
  onchangeFilterTodos() :void{
    //clear input data
    this.filter.titleOrDescription = null
    //reset filter todos
    this.filter.todos = true;

    if(this.filter.contenido == null){
      this.filter.todos = false;
      this.findAndDeleteIndex("descripcion.contains");
      this.findAndDeleteIndex("titulo.contains");
    }else if(this.filter.contenido){
      this.findAndDeleteIndex("descripcion.contains");
    } else {
      this.findAndDeleteIndex("titulo.contains");
    }
    this.listaServicios();
  }

  onChangeHorarioServicio() :void {
    if(this.filter.horario){
      this.criteria.push({param: "disponibilidad.equals", val: this.filter.horario});
    } else {
      console.log("sssssssssssssssssssss")
      this.findAndDeleteIndex("disponibilidad.equals");
    }
    this.listaServicios();
  }

  //using from html
  reset() :void {
    this.filter.usuarioElegido = null;
    this.resetValues();
    this.listaServicios();
  }

  //using
  clearPreciosDesde() :void {
    this.filter.precioDesde = null;
    this.findAndDeleteIndex("preciohora.greaterThanOrEqual");
    this.listaServicios();
  }

  //using
  clearPreciosHasta() :void {
    this.filter.precioHasta = null;
    this.findAndDeleteIndex("preciohora.greaterThanOrEqual");
    this.listaServicios();
  }

  resetValues() :void {
    this.usuarios = []
    this.criteria = []
    this.filter.categoriaElegido = null;
    this.filter.titleOrDescription = null;
    this.filter.precioDesde = null;
    this.filter.precioHasta = null;
    this.filter.horario = null
  }

  goDetalService(id: Number) : void {
    this.router.navigate(['/detalle/servicios', id]);
  }



}
