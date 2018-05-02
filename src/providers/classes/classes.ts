import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserClasses } from '../../classes/userclasses';
import * as firebase from 'firebase';

/*
  Generated class for the ClassesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ClassesProvider {

    constructor(public http: HttpClient) {
        console.log('Hello ClassesProvider Provider');
    }

    getClasses(semester: string, year: number): Observable<UserClasses[]> {
        return this.http.get<UserClasses[]>('/api/classes/' + year + '/' + semester);
    }

    addClass(semester, crn: number, uid) {
        firebase.database().ref('classes/'+semester).orderByChild('crn').equalTo(crn).on('value', resp => {
            let cls = snapshotToArray(resp);
            console.log(cls[0]);
            if(cls[0]){
                const newClass = firebase.database().ref('users/'+uid+'/classes').push();
                newClass.set(cls[0]);
            }
            
        });
    }

    deleteClass(c: UserClasses): Observable<any> {
        return this.http.post('/api/delete', { id: c.id }, httpOptions);
    }

    getClass(id: number, semester) {
        firebase.database().ref('classes/'+semester).on('value', resp => {
            return snapshotToArray(resp);
        });
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
