import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { UserProvider } from '../../providers/user/user';

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

    event = {
        title: '',
        description: '',
        location: '',
        datetime: new Date
    };
    date = new Date();
    time = new Date();
    semester;
    year;
    crn;
    error = '';

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private chatprovider: ChatProvider,
        private userProvider: UserProvider
    ) {
        this.semester = this.navParams.get('semester');
        this.year = this.navParams.get('year');
        this.crn = this.navParams.get('crn');
        this.event.description = '';
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad NewEventPage');
    }

    addEvent() {
        if (this.date == null || this.time == null || this.event.title == null || this.event.location == null) {
            this.error = 'Please fill out all fields';
        } else {
            this.event.datetime = new Date(this.time + ' ' + this.date);
            this.chatprovider.addEvent(this.semester, this.year, this.crn, this.event.title, this.event.datetime, this.event.location, this.event.description, this.userProvider.getUser());
            this.navCtrl.pop();
        }

    }

    dismiss(){
        this.navCtrl.pop();
    }

}
