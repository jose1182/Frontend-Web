import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IContrato } from '../../model/contrato.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ContratosService {

  constructor(
    private http: HttpClient
  ) { }

  getContratoById(id: number | undefined):Observable<IContrato>{
    return this.http.get<IContrato>(`${environment.url}contratoes/${id}`);
  }

  getContratoByUserId(id: number | undefined):Observable<IContrato[]>{
    return this.http.get<IContrato[]>(`${environment.url}contratoes/usuario/?id=${id}`);
  }


  getContratoByServiceId(contrato: IContrato): Observable<IContrato[]>{
    let params = new HttpParams()
    params = params.append("usuarioId.equals", contrato.usuario?.id as number);
    params = params.append("servicioId.equals", contrato.servicio?.id as number)
    //params = params.append("id.in", busqueda.id.in.join(', '))
    //params = params.append("servicioId", "")


    return this.http.get<IContrato[]>(environment.url + "contratoes", {params: params}).pipe(map(result => {
      return result;
    }));
  }

  create(contrato: IContrato): Observable<IContrato>{
    return this.http.post<IContrato>(environment.url + "contratoes", contrato)
  }
}
