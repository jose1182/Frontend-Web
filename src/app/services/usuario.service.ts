import * as dayjs from 'dayjs'
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { isPresent } from 'src/app/core/util/operators';
import { createRequestOption } from 'src/app/core/request/request.util';
import { IUsuario, getUsuarioIdentifier } from '../model/usuario.model';
import { environment } from '../../environments/environment';


export type EntityResponseType = HttpResponse<IUsuario>;
export type EntityArrayResponseType = HttpResponse<IUsuario[]>;

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  protected resourceUrl = environment.url + "usuarios";

  constructor(protected http: HttpClient) {}

  create(usuario: IUsuario): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(usuario);
    return this.http
      .post<IUsuario>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
  update(usuario: IUsuario): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(usuario);
    return this.http
      .put<IUsuario>(`${this.resourceUrl}/${getUsuarioIdentifier(usuario) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(usuario: IUsuario): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(usuario);
    return this.http
      .patch<IUsuario>(`${this.resourceUrl}/${getUsuarioIdentifier(usuario) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUsuario>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUsuario[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addUsuarioToCollectionIfMissing(usuarioCollection: IUsuario[], ...usuariosToCheck: (IUsuario | null | undefined)[]): IUsuario[] {
    const usuarios: IUsuario[] = usuariosToCheck.filter(isPresent);
    if (usuarios.length > 0) {
      const usuarioCollectionIdentifiers = usuarioCollection.map(usuarioItem => getUsuarioIdentifier(usuarioItem)!);
      const usuariosToAdd = usuarios.filter(usuarioItem => {
        const usuarioIdentifier = getUsuarioIdentifier(usuarioItem);
        if (usuarioIdentifier == null || usuarioCollectionIdentifiers.includes(usuarioIdentifier)) {
          return false;
        }
        usuarioCollectionIdentifiers.push(usuarioIdentifier);
        return true;
      });
      return [...usuariosToAdd, ...usuarioCollection];
    }
    return usuarioCollection;
  }

  protected convertDateFromClient(usuario: IUsuario): IUsuario {
    return Object.assign({}, usuario, {
      fn: usuario.fn?.isValid() ? usuario.fn.toJSON() : undefined,
      fechaRegistro: usuario.fechaRegistro?.isValid() ? usuario.fechaRegistro.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fn = res.body.fn ? dayjs(res.body.fn) : undefined;
      res.body.fechaRegistro = res.body.fechaRegistro ? dayjs(res.body.fechaRegistro) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((usuario: IUsuario) => {
        usuario.fn = usuario.fn ? dayjs(usuario.fn) : undefined;
        usuario.fechaRegistro = usuario.fechaRegistro ? dayjs(usuario.fechaRegistro) : undefined;
      });
    }
    return res;
  }
}
