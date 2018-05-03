import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {

    constructor(public http: HttpClient) {
        console.log('Hello ChatProvider Provider');
    }

    sendMessage(message: string, uid, user, crn, semester) {
        let newData = firebase.database().ref('classes/' + semester + '/' + crn + '/messages').push();
        newData.set({
            uid: uid,
            user: user,
            message: message,
            sendDate: Date()
        });
    }

    addEvent(semester, crn, title, date: Date, location, description, uid){
        firebase.database().ref('classes/'+semester+'/'+crn+'/events').push().set({
            title: title,
            location: location,
            description: description,
            datetime: date.toString(),
            creator: uid,
            createdAt: Date()
        });
    }

    getEvents(semester, crn){
        return firebase.database().ref('classes/'+semester+'/'+crn+'/events');
    }

    editEvent(semester, crn, key, event){
        firebase.database().ref('classes/'+semester+'/'+crn+'/events/'+key).update(event);
    }

    deleteEvent(semester, crn, key){
        firebase.database().ref('classes/'+semester+'/'+crn+'/events/'+key).remove();
    }
}
