import { Destaca2 } from './../../model/busqueda.model';
import { ServiciosService } from './../../services/servicios/servicios.service';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { AccountModel } from '../../model/account.model';
import { AuthJwtService } from '../../services/auth-jwt.service';
import { Router } from '@angular/router';
import { CategoriaModel } from '../../model/categoria.model';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { Busqueda } from '../../model/busqueda.model';
import { servicioDesModel } from 'src/app/model/servicioDes.model';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  accountModel!: AccountModel | null;
  categorias!: CategoriaModel[];
  busqueda : Busqueda = {
    parameter: "",
    value: null,
  };

  //mi parte de pruebas
  servicios!: servicioDesModel[];
  destacado3 : Destaca2 = {
    parameter: "",
    value: null,
  };
  


  constructor(
    private accountService: AccountService,
    private authJwtService: AuthJwtService,
    private categoriasService: CategoriaService,
    private serviciosService: ServiciosService,
    private router : Router) {

  }

  ngOnInit(): void {
    this.accountService.identify(true).subscribe( account => {
      console.log(account)
      this.accountModel = account
    })


    this.categoriasService.categorias(this.busqueda).subscribe( categorias => {
      this.categorias = categorias;

    })

    this.serviciosService.serviciosDestacados(this.destacado3).subscribe( servicios => {
      this.servicios = servicios;
    })


  }
  goToViewDetail(id: Number): void{
    this.router.navigate(['lista/servicios', id]);
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
