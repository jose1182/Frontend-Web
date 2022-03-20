import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthJwtService } from '../services/auth-jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private authJWTService: AuthJwtService,  private route: Router){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log('guard IN')

    let loginValue = this.authJWTService.loginValue();
    let isAuthenticated = loginValue?.id_token

    if(isAuthenticated == null){
      this.route.navigate(['/login'], {queryParams: {returnUrl: state.url}})
      return false
    }

    console.log('ise passing')
    return true;
  }

}
