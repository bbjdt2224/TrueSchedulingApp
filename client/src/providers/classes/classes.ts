import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { classes } from '../../classes/classes';

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

    getClasses(semester: string, year: number): Observable<classes[]> {
        return this.http.get<classes[]>('/api/classes/' + year + '/' + semester);
    }

    addClass(c: classes): Observable<any> {
        return this.http.post('/api/classes/' + c.year + '/' + c.semester, {
            semester: c.semester,
            year: c.year,
            days: c.days,
            start: c.start,
            end: c.end,
            title: c.title,
            building: c.building,
            room: c.room
        })
    }

    deleteClass(c: classes): Observable<any> {
        return this.http.post('/api/delete', { id: c.id }, httpOptions);
    }

    getClass(id: number): Observable<classes> {
        return this.http.get<classes>('/api/class/' + id);
    }

    updateClass(c: classes): Observable<any> {
        return this.http.put('/api/class/'+c.id, {
            days: c.days,
            start: c.start,
            end: c.end,
            title: c.title,
            building: c.building,
            room: c.room
        }, httpOptions);
    }

}
