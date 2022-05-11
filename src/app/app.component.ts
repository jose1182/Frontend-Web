import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { AccountModel } from './model/account.model';
import { CookieService } from "ngx-cookie-service";
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthJwtService } from './services/auth-jwt.service';
import { Busqueda } from './model/busqueda.model';
import { Router } from '@angular/router';
import { ToastService } from './services/_services/toast.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
  private readonly destroy$ = new Subject<void>();

  constructor(
    private accountService: AccountService,
    private cookies: CookieService,
    private authJwtService: AuthJwtService,
    private router: Router,
    private toastService: ToastService
    ){

  }

  ngOnInit(): void {

    this.accountService
    .getAuthenticationState()
    .pipe(takeUntil(this.destroy$))
    .subscribe(account => {
      this.accountModel = account;
    });

  }
  public getToken(){
    return this.cookies.get("id_token");
  }

  logout(){
    this.accountService.logout();
    this.accountService.authenticate(null);


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

  showStandard() {
    this.toastService.show('I am a standard toast', {
      delay: 2000,
      autohide: true
    });
  }

  showSuccess() {
    this.toastService.show('I am a success toast', {
      classname: 'bg-success text-light',
      delay: 2000 ,
      autohide: true,
      headertext: 'Toast Header'
    });
  }
  showError() {
    this.toastService.show('I am a success toast', {
      classname: 'bg-danger text-light',
      delay: 2000 ,
      autohide: true,
      headertext: 'Error!!!'
    });
  }

  showCustomToast(customTpl:any) {
    this.toastService.show(customTpl, {
      classname: 'text-light color',
      delay: 3000,
      autohide: true,
    });
  }
  favoritos():void{
  this.router.navigate(['favoritos'])
  }
}
