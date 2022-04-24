import { IUsuario } from './../../model/usuario.model';
import { Component, OnInit } from '@angular/core';
import { AccountModel } from 'src/app/model/account.model';
import { ServicioModel } from 'src/app/model/servicio.model';
//import { UsuarioModel } from 'src/app/model/usuario.model';
import { AccountService } from 'src/app/services/account.service';
import { UsuariosService } from 'src/app/services/usuario/usuarios.service';
import { ServiciosService } from '../../services/servicios/servicios.service';
@Component({
  selector: 'app-perfil-propio',
  templateUrl: './perfil-propio.component.html',
  styleUrls: ['./perfil-propio.component.css']
})
export class PerfilPropioComponent implements OnInit {

  service!: ServicioModel | null;
  accountModel!: AccountModel | null;
  usuarioModel!: IUsuario;
  id: number | null | undefined;

  constructor(
    private accountService: AccountService,
    private userService: UsuariosService,
    private serviceService: ServiciosService,
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
  }

  userData(id: number){
    this.userService.getUsuarioById(id).subscribe( user => {
      this.usuarioModel = user;
      console.log(user);
    })
  }

}
