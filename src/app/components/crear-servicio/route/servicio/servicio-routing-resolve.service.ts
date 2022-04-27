import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ServicioService } from '../../../../services/servicios/servicio.service';
import { IServicio, Servicio } from '../../../../model/servicio.model';



@Injectable({ providedIn: 'root' })
export class ServicioRoutingResolveService implements Resolve<IServicio> {
  constructor(protected service: ServicioService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IServicio> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.findById(id).pipe(
        mergeMap((servicio: HttpResponse<Servicio>) => {
          if (servicio.body) {
            return of(servicio.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Servicio());
  }
}
