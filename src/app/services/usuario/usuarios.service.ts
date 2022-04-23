import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient
  ) { }


  getUsuarioById(id: number | undefined):Observable<IUser>{
    return this.http.get<IUser>(`${environment.url}usuarios/${id}`)
  }

}

