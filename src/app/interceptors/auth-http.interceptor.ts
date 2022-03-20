import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthJwtService } from '../services/auth-jwt.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  token!: String | undefined

  constructor( public authJWTService: AuthJwtService) {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    let loginValue = this.authJWTService.loginValue();
    let token = loginValue?.id_token;

    if(loginValue && token){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${ token }`
        }
      })
    }else {
      console.log('The request dont require autherization')
    }

    return next.handle(request);
  }
}
