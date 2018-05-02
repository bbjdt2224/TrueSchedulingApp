import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Events } from '../../classes/events';

/*
  Generated class for the EventsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class EventsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello EventsProvider Provider');
  }

  addEvent(event: Events): Observable<Event> {
    return this.http.post<Event>('/api/event', {
      datetime: event.datetime,
      title: event.title,
      description: event.description,
      groupId: event.groupId
    }, httpOptions);
  }

  getEvents(id: number): Observable<Events[]>{
    return this.http.get<Events[]>('/api/event/'+id);
  }

}
