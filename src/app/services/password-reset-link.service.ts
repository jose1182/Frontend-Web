import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetLinkService {

  constructor(private http: HttpClient) { }

  save(key: string, newPassword: string): Observable<{}>{
    return this.http.post(environment.url + 'account/reset-password/finish', {key, newPassword});
  }

}
