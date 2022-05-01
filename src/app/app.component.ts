import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { AccountModel } from './model/account.model';
import { CookieService } from "ngx-cookie-service";
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthJwtService } from './services/auth-jwt.service';
import { Busqueda } from './model/busqueda.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend-web';
  id : number = 1;

  accountModel!: AccountModel | null;

  keyword!: string | null
  location!: string | null

  constructor(
    private accountService: AccountService,
    private cookies: CookieService,
    private authJwtService: AuthJwtService,
    private router: Router
    ){

  }

  ngOnInit(): void {
    this.accountService.identify(true).subscribe( account => {
      this.accountModel = account
      console.log("Acount in app compneonte: ", this.accountModel)
    })

  }
  public getToken(){
    return this.cookies.get("id_token");
  }

  logout(){
    this.accountService.logout();

  }

  public isAuthenticated():boolean{
    return this.authJwtService.isAuthenticated();
  }

  getservcios(): void{
    this.router.navigate(['/es/buscar-servicios'],{queryParams:{keyword: this.keyword, location: this.location}})
    this.keyword = null;
    this.location = null;
  }

  goToPerfil():void{
    this.router.navigate(['perfil-propio/vista',], {queryParams:{id: this.accountModel?.id}})
  }
}
