import { ServiciosService } from './../../services/servicios/servicios.service';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { AccountModel } from '../../model/account.model';
import { AuthJwtService } from '../../services/auth-jwt.service';
import { Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { Busqueda } from '../../model/busqueda.model';
import { servicioDesModel } from 'src/app/model/servicioDes.model';
import { ICategoria } from '../../model/categoria.model';
import { IServicio } from '../../model/servicio.model';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  accountModel!: AccountModel | null;
  categorias: ICategoria[] | null = null;;
  busqueda : Busqueda = {
    parameter: "",
    value: null,
  };
  servicios : IServicio[] | null=null;


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

    this.serviciosService.serviciosDestacados().subscribe( servicios => {
      console.log("hola: ", servicios)
      this.servicios = servicios;
      console.log("destacodos: ", servicios);
    })

  }
  goToViewDetail(id?: number): void{
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
