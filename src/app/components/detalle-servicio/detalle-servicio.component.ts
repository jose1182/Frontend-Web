import { UsuariosService } from './../../services/usuario/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServiciosService } from '../../services/servicios/servicios.service';
import { IUsuario, Usuario } from '../../model/usuario.model';
import { IServicio } from '../../model/servicio.model';


@Component({
  selector: 'app-detalle-servicio',
  templateUrl: './detalle-servicio.component.html',
  styleUrls: ['./detalle-servicio.component.css']
})
export class DetalleServicioComponent implements OnInit {

  id!: number | undefined;
  service: IServicio | null = null;
  usuario: Usuario | null = null;

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
      console.log("lll:",service)
      //get user information from service.usuario.id
      this.usuarioService.getUsuarioById(this.service.usuario?.id).subscribe(usuario => {this.usuario = usuario})

    },(error) => {
        console.log("error: ", error)
    })
  }

  goDetailPerfil(id: number | undefined): void {
    this.router.navigate(['perfil-visitado', id]);
  }


}

//https://jossef.github.io/material-design-icons-iconfont/
