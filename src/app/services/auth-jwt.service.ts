import { Injectable } from '@angular/core';
import { LoginModel } from '../model/login.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


const LOGIN_KEY = 'token_id';

type JwtToken = {
  id_token: string;
};


@Injectable({
  providedIn: 'root'
})
export class AuthJwtService {

  private loginModelBehaviorSubject: BehaviorSubject<JwtToken | null>;
  public login: Observable<JwtToken | null>;

  constructor(
    private http: HttpClient,
    private route: Router
    ) {
      this.loginModelBehaviorSubject = new BehaviorSubject<JwtToken | null>(JSON.parse(<string>localStorage?.getItem(LOGIN_KEY)));
      this.login = this.loginModelBehaviorSubject.asObservable();
     }

  performLogin(entry: LoginModel): Observable<void>{
    console.log('perfomrLogin(' + JSON.stringify(entry) + ')');
    return this
      .http
      .post<JwtToken>(environment.url + 'authenticate', entry)
      .pipe(map( response => {
        console.log('Login OK: ' + JSON.stringify(response));
        this.loginModelBehaviorSubject.next(response);
        this.authenticateSuccess(response, entry.remenberMe)
      }))
  }

  private authenticateSuccess(reponse: JwtToken, remenberMe: boolean): void{
    console.log('token: ' + reponse.id_token)
    //let jwt = reponse.id_token;
    localStorage.setItem(LOGIN_KEY, JSON.stringify(reponse));
    if(remenberMe){
      //localStorage.setItem(LOGIN_KEY, JSON.stringify(jwt));
      //sessionStorage.clear()
    } else{
      //sessionStorage.setItem(LOGIN_KEY, JSON.stringify(jwt))
      //localStorage.clear()
    }
}

performLogout(): void {
  localStorage.removeItem(LOGIN_KEY);
  this.loginModelBehaviorSubject.next(null);
  this.route.navigate(['/login']);
}


loginValue(): JwtToken | null {
  return this.loginModelBehaviorSubject?.value

}




}
