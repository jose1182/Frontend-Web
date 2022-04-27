import { servicioDesModel } from './../../model/servicioDes.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IServicio } from '../../model/servicio.model';
import { environment } from '../../../environments/environment.prod';
import { BusquedaServicio } from '../../model/busquedaServicio.model';


@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http: HttpClient) { }


  servicios(criteria: BusquedaServicio[]):Observable<IServicio[]>{

    let params = new HttpParams()

    console.log("long: ", criteria)

    for(var item of criteria){
      console.log("item:", item)
      params = params.append(item.param, item.val)
    }

    //params = params.append("id.in", busqueda.id.in.join(', '))
    //params = params.append("servicioId", "")
    return this.http.get<IServicio[]>(environment.url + "servicios", {params: params})
  }


  getServiceById(id: number | undefined):Observable<IServicio>{
    return this.http.get<IServicio>(`${environment.url}servicios/${id}`);
  }

  serviciosDestacados():Observable<IServicio[]>{
    return this.http.get<IServicio[]>(`${environment.url}servicios?destacado.equals=true`).pipe((result => {

      return result;
    }));
  }

}
