import { Conversacion } from './../../model/conversacion.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MensajeModel } from 'src/app/model/mensaje.model';


@Injectable({
  providedIn: 'root'
})
export class ConversacionesService {

  constructor(
    private http: HttpClient
  ) { }

  getConversacionsByUser(id: number | undefined):Observable<Conversacion[]>{
    return this.http.get<Conversacion[]>(`${environment.url}conversacions/usuario/?id=${id}`);
  }

  getMensajesByConvId(id: number | undefined): Observable<MensajeModel[]>{
    return this.http.get<MensajeModel[]>(`${environment.url}mensajes/conversacion?id=${id}`);
  }

}
