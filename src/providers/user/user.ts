import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../classes/user';
import * as firebase from 'firebase/app';

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

    uid = '';

    constructor(private http: HttpClient) { }

    setUser(uid) {
        this.uid = uid
    }

    getUser() {
        return this.uid;
    }

    login(email: string, password: string) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    signup(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password)

    }

    addUser(name, uid) {
        let newUser = firebase.database().ref('users/'+uid);
        newUser.set({
            name: name
        });
    }

}
