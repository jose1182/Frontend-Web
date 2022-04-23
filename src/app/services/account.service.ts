import { UsuarioModel } from './../model/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, ReplaySubject, BehaviorSubject } from 'rxjs';
import { AccountModel } from '../model/account.model';
import { environment } from '../../environments/environment';
import { shareReplay, tap, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userIdentify: AccountModel | null = null;
  private authenticateState = new ReplaySubject<AccountModel | null>(1);
  public accountCache$?: Observable<AccountModel> | null;

  constructor(
    private http : HttpClient,
    private route: Router

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
/*
  public fetch2(id: any): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(environment.url + 'usuarios/'+ id);
}
*/
}