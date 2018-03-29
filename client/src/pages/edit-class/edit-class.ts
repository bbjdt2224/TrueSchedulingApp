import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { classes } from '../../classes/classes';
import { ClassesProvider } from '../../providers/classes/classes';

/**
 * Generated class for the EditClassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-edit-class',
    templateUrl: 'edit-class.html',
})
export class EditClassPage {

    c = new classes();
    checked = [];
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private classesProvider: ClassesProvider
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditClassPage');
        this.c = this.navParams.get('class');
        this.fillChecked();
    }

    fillChecked() {
        let days = this.c.days;
        let checked = this.checked;
        this.days.forEach(function (day, index) {
            if (days.search(day) >= 0) {
                checked[index] = true;
            }
        })
    }

    updateClass(){
        let daystring = '';
        let days = this.days;
        this.checked.forEach(function(day, index) {
            if(day){
                daystring += days[index];
                daystring += ',';
            }
        });
        daystring = daystring.slice(0, -1);
        this.c.days = daystring;
        this.classesProvider.updateClass(this.c).subscribe(newClass => {
            this.navCtrl.pop();
        });
    }

}
