import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthJwtService } from '../services/auth-jwt.service';
import { AccountService } from '../services/account.service';
import { AccountModel } from '../model/account.model';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor( public authJWTService: AuthJwtService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let loginValue = this.authJWTService.loginValue();
    let token = loginValue?.id_token;


    console.log('token en inyterceptor: ',token)
    if(token){
      request = request.clone({
        setHeaders: {
          //Authorization: `Basic ${this.token}` // Añado token
          Authorization: 'Bearer ' + token
          }
      });
    }else{
      console.log('La petición no requiere autorización');
    }

    return next.handle(request);
  }
}
