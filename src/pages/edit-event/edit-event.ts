import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';

/**
 * Generated class for the EditEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-event',
  templateUrl: 'edit-event.html',
})
export class EditEventPage {

  event;
  semester;
  crn;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private chatProvider: ChatProvider
  ) {
    this.event = this.navParams.get('event');
    this.semester = this.navParams.get('semester');
    this.crn = this.navParams.get('crn');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditEventPage');
  }

  editEvent(){
    this.chatProvider.editEvent(this.semester, this.crn, this.event.key, this.event);
    this.dismiss();
  }

  dismiss(){
    this.navCtrl.pop();
  }

}