import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServiciosService } from '../../services/servicios/servicios.service';
import { BusquedaServicio } from '../../model/busquedaServicio.model';
import { CategoriaModel } from '../../model/categoria.model';
import { ServicioModel } from '../../model/servicio.model';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { Busqueda } from '../../model/busqueda.model';

@Component({
  selector: 'app-busqueda-home',
  templateUrl: './busqueda-home.component.html',
  styleUrls: ['./busqueda-home.component.css']
})
export class BusquedaHomeComponent implements OnInit {

  keyword!: string | null
  location!: string | null
  criteria: BusquedaServicio [] = [];
  servicios!: ServicioModel[];
  categorias!: CategoriaModel[];
  busqueda : Busqueda = {
    parameter: "",
    value: null,
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serviciosService: ServiciosService,
    private categoriasService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.queryParams();
    this.listaServicios();
    this.listaCategorias();
  }

  queryParams():void{
    this.route.queryParams.subscribe(params => {
      if(params['keyword']) {
        this.keyword = params['keyword']
        this.criteria.push({param: "titulo.contains", val: this.keyword})
      }
      if(params['location']){
        this.criteria.push({param: "usuario.localidad", val: this.location})
      }
    });
  }

  listaServicios(): void{

    //TODO falta controlar array criteria con pulsación boton, solo sebe ser posible añadir un item en array.
    this.serviciosService.servicios(this.criteria).subscribe(servicios => {
      //saving all services
      this.servicios = servicios;
    })
  }

  goDetalService(id: Number) : void {
    this.router.navigate(['/detalle/servicios', id]);
  }

  listaCategorias():void{
    this.categoriasService.categorias(this.busqueda).subscribe( categorias => {
      this.categorias = categorias;
    })
  }

  goToViewDetail(id: Number): void{
    this.router.navigate(['lista/servicios', id]);
  }
}
