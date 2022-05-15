import { IServicio } from './../../model/servicio.model';
import { Servicio } from './../../model/servicio.model';
import { ServiciosService } from './../../services/servicios/servicios.service';
import { Favoritos } from './../../model/favoritos.model';
import { AccountService } from 'src/app/services/account.service';
import { AuthJwtService } from './../../services/auth-jwt.service';
import { AccountModel } from 'src/app/model/account.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FavoritosService } from 'src/app/services/favoritos/favoritos.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  accountModel!: AccountModel | null;
  favoritos : Favoritos[] | undefined;
  id! : number | undefined;
  service!: IServicio;
  services: Servicio[] = [];

  constructor(
    
    private accountService: AccountService,
    private favoritosService : FavoritosService,
    private router : Router,
    private route : ActivatedRoute,
    private authJwtService: AuthJwtService,
    private serviceService: ServiciosService) {

  }

  ngOnInit(): void {
   this.checkLogin();
  }
  servicioFavorito(id: number | undefined): void {
    this.serviceService.getServiceById(id).subscribe( (service) => {
      if(service){
        this.services.push(service)
        console.log("lll:" + service)
    //get user information from service.usuario.id
    //this.usuarioService.getUsuarioById(this.service.usuario?.id).subscribe(usuario => {this.usuario = usuario})
      }
      console.log("paco", this.services)
    })
  }

  checkLogin(): void {
    this.accountService.identify(true).subscribe( account => {
      if(account){
        this.accountModel = account
        console.log("Logueado para ver favoritos");
        console.log(this.accountModel);
       if(this.accountModel.id){
         this.getFavoritos(this.accountModel.id);
       }
      } else {
        console.log('No has iniciado sesión');
        this.router.navigate(['home']);
      }
    })
  }
    getFavoritos(id : number): void {
      this.favoritosService.favoritosPorId(id).subscribe( favoritos => {
        this.favoritos = favoritos;
        if(this.favoritos) {
          console.log(this.favoritos);

          for(let i = 0; i < this.favoritos.length; i++) {

            if(this.favoritos[i].servicio){
              this.servicioFavorito(this.favoritos[i].servicio.id);  
              console.log(this.favoritos[i].servicio.id);
            }
          }
        }
      })
    }

    goToFavoritos(id?: number): void{
      this.router.navigate(['/detalle/servicios', id]);
    }
  

   
    isAuthenticated() : boolean {
      return this.authJwtService.loginValue() != null
    }
  
    logout(){
      this.authJwtService.performLogout();
      this.accountModel = null
      this.router.navigate(['/home'])
  
    }

}


