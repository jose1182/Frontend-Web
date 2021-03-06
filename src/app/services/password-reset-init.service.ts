import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetInitService {

  constructor(private http: HttpClient) { }

  save(mail: string): Observable<{}>{
    return this.http.post(environment.url + 'account/reset-password/init', mail);
  }
}
