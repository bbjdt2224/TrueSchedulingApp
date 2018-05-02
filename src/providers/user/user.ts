import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../classes/user';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let currUser;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserProvider {

  constructor(private http: HttpClient) { }

  getUser(): Observable<User>{
    return currUser;
  }

  login(email: string, password: string): Observable<User> {
    currUser =  this.http.post<User>('/api/login',{
      email: email,
      password: password
    }, httpOptions);

    return currUser;
  }

  signup(email: string, password: string, name: string): Observable<string>{
    return this.http.post<string>('/api/signup', {
      email: email,
      password: password,
      name: name
    }, httpOptions);
  }

}
