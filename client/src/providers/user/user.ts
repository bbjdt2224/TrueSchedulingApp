import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../classes/user';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserProvider {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('/api/login',{
      email: email,
      password: password
    }, httpOptions);
  }

  signup(email: string, password: string, name: string): Observable<string>{
    return this.http.post<string>('/api/signup', {
      email: email,
      password: password,
      name: name
    }, httpOptions);
  }

}
