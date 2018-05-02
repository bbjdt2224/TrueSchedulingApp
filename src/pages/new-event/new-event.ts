import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from '../../classes/events';
import { EventsProvider } from '../../providers/events/events';
import { GroupRelation } from '../../classes/grouprelation';

/**
 * Generated class for the NewEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-event',
  templateUrl: 'new-event.html',
})
export class NewEventPage {

  event = new Events();
  date = new Date();
  time = new Date();
  groupRelation = new GroupRelation()

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private eventsProvider: EventsProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewEventPage');
    this.groupRelation = this.navParams.get('group');
  }

  addEvent(){
    this.event.datetime = new Date(this.time+' '+this.date);
    this.event.groupId = this.groupRelation.groupId;
    this.eventsProvider.addEvent(this.event).subscribe(event => {
      this.navCtrl.pop();
    })
  }

}
