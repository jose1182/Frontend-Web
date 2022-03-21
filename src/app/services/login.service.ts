import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginModel } from '../model/login.model';
import { HttpClient } from '@angular/common/http'
import { map, mergeMap } from 'rxjs/operators';
import { AuthJwtService } from './auth-jwt.service';
import { AccountModel } from '../model/account.model';
import { AccountService } from './account.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private route: Router,
              private authJwtService: AuthJwtService,
              private accountService: AccountService
  ) {

  }

  performLogin(login: LoginModel): Observable<AccountModel  | null>{
    return this.authJwtService.performLogin(login).pipe(mergeMap(()=> this.accountService.identify(true)));

  }




}
