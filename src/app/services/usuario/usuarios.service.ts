import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioModel } from 'src/app/model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient
  ) { }


  getUsuarioById(id: Number):Observable<UsuarioModel>{
    return this.http.get<UsuarioModel>(`${environment.url}usuarios/${id}`)
  }

}

