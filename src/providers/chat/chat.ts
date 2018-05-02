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

  sendMessage(message: string, user, group){
    let newData = firebase.database().ref('groups/'+group+'/chats').push();
        newData.set({
          user:user,
          message:message,
          sendDate:Date()
        });
  }

}
