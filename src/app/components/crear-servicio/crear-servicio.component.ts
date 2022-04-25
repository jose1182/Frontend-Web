import { AccountModel } from './../../model/account.model';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { IUsuario } from '../../model/usuario.model';
import { UsuariosService } from '../../services/usuario/usuarios.service';

@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['./crear-servicio.component.css']
})
export class CrearServicioComponent implements OnInit {

  account! : AccountModel | null
  usuarioModel!: IUsuario;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private userService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.accountService.identify(true).subscribe( account => {
      this.account = account
      console.log("aaaaaaaaaa: ",this.account) ;

      if(!this.checkAuthorities(this.account?.authorities)){
        this.router.navigate(['cuenta-especialista']);
      }

    })

  }


  checkAuthorities(authorities:string[] | undefined): boolean{

    let authority = authorities?.find(role => role == "ROLE_ESPECIALISTA");

    if(!authority){
      return false;
    }
    return true;
  }


}
