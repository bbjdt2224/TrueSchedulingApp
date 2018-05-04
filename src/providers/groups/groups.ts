import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GroupRelation } from '../../classes/grouprelation';
import { Group } from '../../classes/group';

/*
  Generated class for the GroupsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class GroupsProvider {

    constructor(public http: HttpClient) {
        console.log('Hello GroupsProvider Provider');
    }

    getGroups(): Observable<GroupRelation[]> {
        return this.http.get<GroupRelation[]>('/api/group');
    }

    newGroup(group: Group): Observable<any> {
        return this.http.post('/api/group', {
            groupName: group.groupName,
            groupCode: group.groupCode
        }, httpOptions);
    }

    checkCode(code: number): Observable<boolean>{
        return this.http.post<boolean>('/api/code', {
            code: code
        }, httpOptions);
    }

    joinGroup(code: number): Observable<any>{
        return this.http.post('/api/join', {
            code: code
        }, httpOptions);
    }

}
