import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { AccountModel } from './model/account.model';
import { CookieService } from "ngx-cookie-service";
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthJwtService } from './services/auth-jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend-web';


  accountModel!: AccountModel | null;


  constructor(
    private accountService: AccountService,
    private cookies: CookieService,
    private authJwtService: AuthJwtService
    ){

  }

  ngOnInit(): void {
    this.accountService.identify(true).subscribe( account => {
      console.log(account)
      this.accountModel = account
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
}
