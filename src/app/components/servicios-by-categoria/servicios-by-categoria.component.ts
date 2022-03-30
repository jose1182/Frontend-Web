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
  servicioElegido: any = null;

  servicios!: ServicioModel[];
  categorias!: CategoriaModel[];

  buscarServicios : BusquedaServicios = {
    id: null,
    titulo: "",
    descripcion: "",
    disponibilidad: "",
    preciohora: null,
    preciotraslado: null,
    usuario: null,
    categorias: []
  }



  busquedaServicio: BusquedaServicio = {
    parameter: "",
    value: null,
    modelo: ""
  };
  busqueda : Busqueda = {
    id:{
      equals: null,
      in:[]
    },
    nombre:{
      equals: "homogénea web"
    }
  };

  constructor(
    private  route: ActivatedRoute,
    private serviciosService:ServiciosService,
    private categoriasService: CategoriaService,
    ) { }

  ngOnInit(): void {

    this.getQueryParams();
    this.listaServicios();
    this.listaCategorias();

  }

  getQueryParams(): void {
    this.route.paramMap.subscribe((params: Params) => {
      this.id = params.get('id');
      this.busquedaServicio.parameter = "categoriaId.equals";
      this.busquedaServicio.value = this.id;
    })
  }

  listaServicios(): void{
    console.log(this.busquedaServicio)
    this.serviciosService.servicios(this.busquedaServicio).subscribe(servicios => {
      console.log(servicios)
      this.servicios = servicios;
    })
  }

  listaCategorias(): void{
    this.categoriasService.categorias(this.busqueda).subscribe( categorias => {
      this.categorias = categorias;

    })
  }

  onChangeServicio(): void{
    if(this.servicioElegido){
      this.buscarServicios.usuario = this.servicioElegido.usuario
      console.log("elegida: ", this.servicioElegido)
    } else {

    }
    this.listaServicios();
  }

  reset() :void {
    this.busquedaServicio.parameter = "";
    this.busquedaServicio.value = null;
    this.listaServicios();
  }

}
