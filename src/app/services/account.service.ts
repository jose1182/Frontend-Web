
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, ReplaySubject, BehaviorSubject } from 'rxjs';
import { AccountModel } from '../model/account.model';
import { environment } from '../../environments/environment';
import { shareReplay, tap, catchError} from 'rxjs/operators';
import { AuthJwtService } from './auth-jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userIdentify: AccountModel | null = null;
  private authenticateState = new ReplaySubject<AccountModel | null>(1);
  public accountCache$?: Observable<AccountModel> | null;
  public role: string = "rolespecialista"

  constructor(
    private http : HttpClient,
    private route: Router,
    private authJwtService: AuthJwtService

  ) {}


  identify(force?: boolean): Observable<AccountModel | null>{
    if(!this.accountCache$ || force){
      this.accountCache$ = this.fetch().pipe(tap(()=>{
        //this.route.navigate(['home'])
      }))
    }
    return this.accountCache$.pipe(catchError(() => of(null)));
  }


  private fetch(): Observable<AccountModel>{
    console.log('fetch: ', environment.url + 'account')
    return this.http.get<AccountModel>(environment.url + 'account')
  }

  //solo para test, no se contempla implentar un servicio de pago
  updateAccount(): Observable<{}>{
    return this.http.post(`${environment.url + this.role}`,"");
  }

  logout(){
    this.authJwtService.performLogout();
  }

  isAuthenticated(){
    return this.authJwtService.isAuthenticated();
  }

}
