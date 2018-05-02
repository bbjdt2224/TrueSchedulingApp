import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { classes } from '../../classes/classes';
import { UserClasses } from '../../classes/userclasses';
import { ClassesProvider } from '../../providers/classes/classes';

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

    uc = new UserClasses();
    c = new classes();
    start = '';
    end = '';

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private viewCtrl: ViewController,
        private alertCtrl: AlertController,
        private classesProvider: ClassesProvider
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ClassModalPage');
        this.uc = this.navParams.get('class');
        this.c = this.uc.class;
        const time = this.c.time.split(' ');
        this.start = this.formatTime(time[0]);
        this.end = this.formatTime(time[2]);
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
                        this.classesProvider.deleteClass(this.uc).subscribe(cls => {
                            this.dismiss();
                        });
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

}
