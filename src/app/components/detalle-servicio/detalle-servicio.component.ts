import { UsuariosService } from './../../services/usuario/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServiciosService } from '../../services/servicios/servicios.service';
import { ServicioModel } from '../../model/servicio.model';
import { UsuarioModel } from '../../model/usuario.model';

@Component({
  selector: 'app-detalle-servicio',
  templateUrl: './detalle-servicio.component.html',
  styleUrls: ['./detalle-servicio.component.css']
})
export class DetalleServicioComponent implements OnInit {

  id!: Number;
  service!: ServicioModel
  usuario!: UsuarioModel

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiciosService,
    private usuarioService: UsuariosService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: Params) => {
    this.id = params.get('id');
  })

  //Get Servicxe By Id from URL
  this.getServiceById()


  }

  getServiceById() : void {
    this.serviceService.getServiceById(this.id).subscribe( (service) => {
      this.service = service

      //get user information from service.usuario.id
      this.usuarioService.getUsuarioById(this.service.usuario.id).subscribe(usuario => {this.usuario = usuario})

    },(error) => {
        console.log("error: ", error)
    })
  }

  goDetailPerfil(id: Number): void {
    this.router.navigate(['perfil-visitado', id]);
  }


}

//https://jossef.github.io/material-design-icons-iconfont/
