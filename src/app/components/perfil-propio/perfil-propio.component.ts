import { IUsuario } from './../../model/usuario.model';
import { Component, OnInit } from '@angular/core';
import { AccountModel } from 'src/app/model/account.model';
import { AccountService } from 'src/app/services/account.service';
import { UsuariosService } from 'src/app/services/usuario/usuarios.service';
import { ServiciosService } from '../../services/servicios/servicios.service';
import { IServicio } from '../../model/servicio.model';
import { BusquedaServicio } from '../../model/busquedaServicio.model';
@Component({
  selector: 'app-perfil-propio',
  templateUrl: './perfil-propio.component.html',
  styleUrls: ['./perfil-propio.component.css']
})
export class PerfilPropioComponent implements OnInit {

  service: IServicio | null= null;
  accountModel!: AccountModel | null;
  usuarioModel!: IUsuario ;
  id: number | null | undefined;
  criteria: BusquedaServicio [] = [];
  servicios!: IServicio[];
  numDestacados!: any;
  constructor(
    private accountService: AccountService,
    private userService: UsuariosService,
    private serviciosService: ServiciosService,
  ) {
    this.id = 0;
  }

  ngOnInit(): void {
    this.accountService.identify(true).subscribe( account => {
      this.id = account?.id;
      this.accountModel = account;
      if (this.id){
        this.userData(this.id);

      }
    })

    this.listaServicios();
  }

  userData(id: number){
    this.userService.getUsuarioById(id).subscribe( user => {
      this.usuarioModel = user;
      console.log(user);
    })
  }

  listaServicios(): void{
    //TODO falta controlar array criteria con pulsación boton, solo sebe ser posible añadir un item en array.
    this.serviciosService.servicios(this.criteria).subscribe(servicios => {
      //saving all services
      this.numDestacados = servicios.filter((servicio) => {
        return servicio.destacado == true;
      }).length;

      this.servicios = servicios;

    })
  }

}
