import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { classes } from '../../classes/classes';
import { UserClasses } from '../../classes/userclasses';

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

    addClass(c: classes, crn: number): Observable<any> {
        return this.http.post('/api/classes/' + c.year + '/' + c.semester, {
            crn: crn
        })
    }

    deleteClass(c: UserClasses): Observable<any> {
        return this.http.post('/api/delete', { id: c.id }, httpOptions);
    }

    getClass(id: number): Observable<UserClasses> {
        return this.http.get<UserClasses>('/api/class/' + id);
    }

}
