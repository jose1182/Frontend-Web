import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getCategoriaIdentifier, ICategoria } from '../../model/categoria.model';
import { environment } from '../../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { Busqueda } from '../../model/busqueda.model';
import { isPresent } from '../../core/util/operators';
import { EntityArrayResponseType } from '../usuario.service';
import { createRequestOption } from '../../core/request/request.util';



@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }



  categorias(busqueda: Busqueda): Observable<ICategoria[]>{
    let params = new HttpParams()
    params = params.append(busqueda.parameter, busqueda.value);
    //params = params.append("id.in", busqueda.id.in.join(', '))
    //params = params.append("servicioId", "")


    return this.http.get<ICategoria[]>(environment.url + "categorias", {params: params}).pipe(map(result => {
      console.log("result: " ,result)
      //make son validations in futuro
      return result;
    }));
  }

  addCategoriaToCollectionIfMissing(
    categoriaCollection: ICategoria[],
    ...categoriasToCheck: (ICategoria | null | undefined)[]
  ): ICategoria[] {
    const categorias: ICategoria[] = categoriasToCheck.filter(isPresent);
    if (categorias.length > 0) {
      const categoriaCollectionIdentifiers = categoriaCollection.map(categoriaItem => getCategoriaIdentifier(categoriaItem)!);
      const categoriasToAdd = categorias.filter(categoriaItem => {
        const categoriaIdentifier = getCategoriaIdentifier(categoriaItem);
        if (categoriaIdentifier == null || categoriaCollectionIdentifiers.includes(categoriaIdentifier)) {
          return false;
        }
        categoriaCollectionIdentifiers.push(categoriaIdentifier);
        return true;
      });
      return [...categoriasToAdd, ...categoriaCollection];
    }
    return categoriaCollection;
  }

  getAllCatogorias(req?: any): Observable<EntityArrayResponseType>{
    //const options = createRequestOption(req);
    return this.http.get<ICategoria[]>(environment.url + "categorias", { observe: 'response'})
  }

}
