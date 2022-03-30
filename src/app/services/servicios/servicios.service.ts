import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicioModel } from '../../model/servicio.model';
import { environment } from '../../../environments/environment.prod';
import { BusquedaServicio } from '../../model/busquedaServicio.model';


@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http: HttpClient) { }


  servicios(busqueda: BusquedaServicio):Observable<ServicioModel[]>{
    let params = new HttpParams()
    params = params.append(busqueda.parameter, busqueda.value);
    //params = params.append("id.in", busqueda.id.in.join(', '))
    //params = params.append("servicioId", "")
    return this.http.get<ServicioModel[]>(environment.url + "servicios", {params: params})
  }


}
