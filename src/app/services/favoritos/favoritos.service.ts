import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Favoritos } from 'src/app/model/favoritos.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  constructor(private http: HttpClient) { }


  favoritosPorId(id: number | undefined):Observable<Favoritos[]>{
    return this.http.get<Favoritos[]>(`${environment.url}favoritos/usuario?id=${id}`);
  }
}
