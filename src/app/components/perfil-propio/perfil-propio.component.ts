import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UsuariosService } from '../../services/usuario/usuarios.service';
import { Usuario, IUsuario } from '../../model/usuario.model';
import { IUser } from '../../model/user.model';

@Component({
  selector: 'app-perfil-propio',
  templateUrl: './perfil-propio.component.html',
  styleUrls: ['./perfil-propio.component.css']
})
export class PerfilPropioComponent implements OnInit {

  id!: number;
  usuario: IUsuario | null = null;
  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.getUrlParams();
  }

  getUrlParams(){
    this.route.queryParams.subscribe(params => {
      if(params['id']) {
        this.id = params['id'];
      }
      this.usuarioService.getUsuarioById(this.id).subscribe(usuario =>{
        this.usuario = usuario;
      })
      console.log("GET usuario: ", this.usuario);
    });
  }
}
