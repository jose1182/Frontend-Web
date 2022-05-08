import { Conversacion } from './../../model/conversacion.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMensaje, MensajeModel } from 'src/app/model/mensaje.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConversacionesService {

  constructor(
    private http: HttpClient
  ) { }

  public getConversacionsByUser(id: number | undefined):Observable<Conversacion[]>{
    return this.http.get<Conversacion[]>(`${environment.url}conversacions/usuario/?id=${id}`);
  }

  public getMensajesByConvId(id: number | undefined): Observable<MensajeModel[]>{
    return this.http.get<MensajeModel[]>(`${environment.url}mensajes/conversacion?id=${id}`);
  }

  public nuevoMensaje(mensaje: IMensaje): Observable<any> {
    return this.http
    .post<IMensaje>(environment.url + 'mensajes', mensaje)
    .pipe(map( response => {
      console.log('Mensaje creado: ' + JSON.stringify(response));
    }))
  }

  public nuevaConversacion(): Observable<any> {
    return this.http
    .post<any>(environment.url + 'conversacions', JSON.parse('{ }'))
    .pipe(map( response => {
      console.log('Conversacion creada: ' + JSON.stringify(response));
    }))
  }

}
