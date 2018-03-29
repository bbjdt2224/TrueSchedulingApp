import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { classes } from '../../classes/classes';
import { ClassesProvider } from '../../providers/classes/classes';
import { EditClassPage } from '../edit-class/edit-class';

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
        this.c = this.navParams.get('class');
        this.start = this.formatTime(this.c.start);
        this.end = this.formatTime(this.c.end);
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
                        this.classesProvider.deleteClass(this.c).subscribe(cls => {
                            this.dismiss();
                        });
                    }
                }
            ]
        });
        alert.present();
    }

    editClass() {
        this.navCtrl.push(EditClassPage, { class: this.c });
    }

    formatTime(time: string): string{
        if(parseInt(time) > 12){
            console.log(time)
            return parseInt(time)-12+':'+time.split(':')[1];
        }
        else{
            return parseInt(time)+':'+time.split(':')[1];
        }
    }

}
