import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class UserProvider {

    uid = '';

    constructor() { }

    setUser(uid) {
        this.uid = uid
    }

    getUser() {
        return this.uid;
    }

    getName(){
        return firebase.database().ref('users/'+this.uid)
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

    getClasses(semester: string, year: number) {
        return firebase.database().ref('users/'+this.uid+'/classes/'+year+'/'+semester);
    }

    addClass(semester, year, crn: number) {
        firebase.database().ref('classes/'+year+'/'+semester+'/'+crn).on('value', resp => {
            let cls = resp.val();
            if(cls){
                firebase.database().ref('users/'+this.uid+'/classes/'+year+'/'+semester+'/'+cls.crn).set(cls);
            }
        });
    }

    removeClass(semester, year, crn){
        firebase.database().ref('users/'+this.uid+'/classes/'+year+'/'+semester+'/'+crn).remove();
    }
    
    getClass(crn, semester, year) {
        return firebase.database().ref('users/'+this.uid+'/classes/'+year+'/'+semester+'/'+crn);
    }

}

export const snapshotToArray = snapshot => {
    let returnArr = [];
    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};
