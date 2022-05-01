import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContratoModel } from '../../model/contrato.model';
import { ServicioModel } from '../../model/servicio.model';
@Injectable({
  providedIn: 'root'
})
export class ContratosService {

  constructor(
    private http: HttpClient
  ) { }

  getContratoById(id: number | undefined):Observable<ContratoModel>{
    return this.http.get<ContratoModel>(`${environment.url}contratoes/${id}`);
  }

  getContratoByUserId(id: number | undefined):Observable<ContratoModel[]>{
    return this.http.get<ContratoModel[]>(`${environment.url}contratoes/usuario/?id=${id}`);
  }
}
