import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
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


  getUsuarioById(id?: number | null ):Observable<IUsuario>{
    return this.http.get<IUsuario>(`${environment.url}usuarios/${id}`)
  }

  update(usuario: IUsuario): Observable<IUsuario> {
    return this.http
      .patch<IUsuario>(`${environment.url}usuarios/${usuario.id}`, usuario);
  }
  

}

