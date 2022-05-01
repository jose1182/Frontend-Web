import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../../model/user.model';
import { IUsuario } from '../../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient
  ) { }


  getUsuarioById(id?: number ):Observable<IUsuario>{
    return this.http.get<IUsuario>(`${environment.url}usuarios/${id}`)
  }

}

