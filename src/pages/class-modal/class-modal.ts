import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the ClassModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-class-modal',
    templateUrl: 'class-modal.html',
})
export class ClassModalPage {

    c = {
        title: '',
        building: '',
        room: '',
        time: '',
        crn: ''
    };
    start = '';
    end = '';
    semester = '';
    year;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private viewCtrl: ViewController,
        private alertCtrl: AlertController,
        private userProvider: UserProvider
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ClassModalPage');
        this.c = this.navParams.get('class');
        const time = this.c.time.split(' ');
        this.start = this.formatTime(time[0]);
        this.end = this.formatTime(time[2]);
        this.semester = this.navParams.get('semester');
        this.year = this.navParams.get('year');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    deletePrompt() {
        let alert = this.alertCtrl.create({
            title: 'Confirm Delete',
            message: 'Do you want to delete this class?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {

                    }
                },
                {
                    text: 'Delete',
                    handler: () => {
                        this.userProvider.removeClass(this.semester, this.year, this.c.crn);
                        this.navCtrl.pop();
                    }
                }
            ]
        });
        alert.present();
    }

    formatTime(time: string): string{
        if(parseInt(time) > 12){
            return parseInt(time)-12+':'+time.split(':')[1];
        }
        else{
            return parseInt(time)+':'+time.split(':')[1];
        }
    }

    groupHome(crn) {
        this.navCtrl.setRoot('GroupHomePage', { group: crn, semester: this.semester, year: this.year})
    }

}
