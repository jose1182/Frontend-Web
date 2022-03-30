import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaModel } from '../../model/categoria.model';
import { environment } from '../../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { Busqueda } from '../../model/busqueda.model';



@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }



  categorias(busqueda: Busqueda): Observable<CategoriaModel[]>{
    let params = new HttpParams()
    //params = params.append("id.equals", 1);
    //params = params.append("id.in", busqueda.id.in.join(', '))
    //params = params.append("servicioId", "")


    return this.http.get<CategoriaModel[]>(environment.url + "categorias", {params: params}).pipe(map(result => {
      console.log("result: " ,result)
      //make son validations in futuro
      return result;
    }));
  }

}
