import { UsuarioModel } from 'src/app/model/usuario.model';
import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuario/usuarios.service';
import { ActivatedRoute, Params } from '@angular/router';
import { BusquedaServicio } from '../../model/busquedaServicio.model';
import { ServiciosService } from '../../services/servicios/servicios.service';
import { ServicioModel } from '../../model/servicio.model';

@Component({
  selector: 'app-perfil-visitado',
  templateUrl: './perfil-visitado.component.html',
  styleUrls: ['./perfil-visitado.component.css']
})
export class PerfilVisitadoComponent implements OnInit {

  id!: number;
  usuario!: UsuarioModel
  criteria: BusquedaServicio [] = [];
  servicios!: ServicioModel[];

  constructor(
    private usuarioService: UsuariosService,
    private route: ActivatedRoute,
    private serviciosService:ServiciosService,
  ) {


  }

  ngOnInit(): void {

    this.getUrlParams();

    this.listaServicios();

  }

getUrlParams(){
  this.route.paramMap.subscribe((params: Params)=>{
    this.id = params.get('id');
    this.criteria.push({param: "usuarioId.equals", val: this.id})
  });

  this.getUserById(this.id);
}

getUserById(id: number):void{
  this.usuarioService.getUsuarioById(id).subscribe(usuario => {
    this.usuario = usuario;
  }, (error) => {
    //TODO gestionar error
    console.log(error)
  });
}

listaServicios(): void{
  //TODO falta controlar array criteria con pulsación boton, solo sebe ser posible añadir un item en array.
  this.serviciosService.servicios(this.criteria).subscribe(servicios => {
    //saving all services
    this.servicios = servicios;

  })
}


}
