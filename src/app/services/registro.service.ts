import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RegistroModel } from '../model/registro.model';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {


    constructor(
      private http: HttpClient
    ){}

    public getRegisteredUser(form: any):void {
        console.log('Usuario registrado con éxito.');
        console.log(form.value);
    }

    public registerUser(user: RegistroModel): Observable<any> {
      console.log('Registro(' + JSON.stringify(user) + ')');
      return this
      .http
      .post<RegistroModel>(environment.url + 'register', user)
      .pipe(map( response => {
        console.log('Register Service OK');
      }))
    }
}