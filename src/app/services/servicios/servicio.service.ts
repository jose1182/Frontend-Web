import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IServicio, getServicioId} from '../../model/servicio.model';
import { environment } from '../../../environments/environment.prod';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

export type EntityResponseType = HttpResponse<IServicio>;

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(
    private http: HttpClient
  ) { }

  findById(id:number):Observable<EntityResponseType>{
    return this.http.get<IServicio>(`${environment.url}servicios/${id}`, {observe: 'response'})
    .pipe(map((res: EntityResponseType) => this.convertDataFromServer(res)));
  }


  private convertDataFromServer(res: EntityResponseType): EntityResponseType {
    if(res.body){
      res.body.fechacreacion = res.body.fechacreacion ? dayjs(res.body.fechacreacion) : undefined;
      res.body.fechaactualizacion = res.body.fechaactualizacion ? dayjs(res.body.fechaactualizacion): undefined;
    }
    return res;
  }

  create(servicio: IServicio): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(servicio);
    return this.http
      .post<IServicio>(environment.url + "servicios", copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(servicio: IServicio): Observable<EntityResponseType>{
    const copy = this.convertDateFromClient(servicio);
    return this.http
    .put<IServicio>(`${environment.url}servicios/${getServicioId(servicio) as number}`, copy, {observe: 'response'})
    .pipe(map((res: EntityResponseType) => this.convertDataFromServer(res)));
  }

  private convertDateFromClient(servicio: IServicio): IServicio {
    return Object.assign({}, servicio, {
      fechacreacion: servicio.fechacreacion?.isValid() ? servicio.fechacreacion.toJSON() : undefined,
      fechaactualizacion: servicio.fechaactualizacion?.isValid() ? servicio.fechaactualizacion.toJSON() : undefined,
    });
  }

  private convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechacreacion = res.body.fechacreacion ? dayjs(res.body.fechacreacion) : undefined;
      res.body.fechaactualizacion = res.body.fechaactualizacion ? dayjs(res.body.fechaactualizacion) : undefined;
    }
    return res;
  }

}
