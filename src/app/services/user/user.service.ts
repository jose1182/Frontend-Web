import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagination } from '../../core/request/request.model';
import { environment } from '../../../environments/environment.prod';
import { IUser, getUserIdentifier } from '../../model/user.model';
import { isPresent } from '../../core/util/operators';
import { createRequestOption } from '../../core/request/request.util';

@Injectable({ providedIn: 'root' })
export class UserService {
  private resourceUrl = environment.url + "users";

  constructor(private http: HttpClient) {}

  query(req?: Pagination): Observable<HttpResponse<IUser[]>> {
    const options = createRequestOption(req);
    return this.http.get<IUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  addUserToCollectionIfMissing(userCollection: IUser[], ...usersToCheck: (IUser | null | undefined)[]): IUser[] {
    const users: IUser[] = usersToCheck.filter(isPresent);
    if (users.length > 0) {
      const userCollectionIdentifiers = userCollection.map(userItem => getUserIdentifier(userItem)!);
      const usersToAdd = users.filter(userItem => {
        const userIdentifier = getUserIdentifier(userItem);
        if (userIdentifier == null || userCollectionIdentifiers.includes(userIdentifier)) {
          return false;
        }
        userCollectionIdentifiers.push(userIdentifier);
        return true;
      });
      return [...usersToAdd, ...userCollection];
    }
    return userCollection;
  }
}
