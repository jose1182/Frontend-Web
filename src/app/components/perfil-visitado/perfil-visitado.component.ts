
import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuario/usuarios.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BusquedaServicio } from '../../model/busquedaServicio.model';
import { ServiciosService } from '../../services/servicios/servicios.service';
import { IServicio } from '../../model/servicio.model';
import { Usuario } from '../../model/usuario.model';

@Component({
  selector: 'app-perfil-visitado',
  templateUrl: './perfil-visitado.component.html',
  styleUrls: ['./perfil-visitado.component.css']
})
export class PerfilVisitadoComponent implements OnInit {

  id!: number;
  usuario!: Usuario
  criteria: BusquedaServicio [] = [];
  servicios!: IServicio[];

  constructor(
    private usuarioService: UsuariosService,
    private router: Router,
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
    console.log("usuario +++: ", usuario);
  }, (error) => {
    //TODO gestionar error
    console.log("Error +++: ", error)
  });
}

listaServicios(): void{
  //TODO falta controlar array criteria con pulsación boton, solo sebe ser posible añadir un item en array.
  this.serviciosService.servicios(this.criteria).subscribe(servicios => {
    //saving all services
    this.servicios = servicios;

  })
}

goToConversacion() { 
  //Manda el id de usuario para crear la conversación
  this.router.navigate(['conversaciones/user', this.id]);
}


}
