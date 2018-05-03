import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserClasses } from '../../classes/userclasses';
import { classes } from '../../classes/classes';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the NewClassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-new-class',
    templateUrl: 'new-class.html',
})
export class NewClassPage {

    semester: string;
    year: string;
    crn = [];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private userProvider: UserProvider
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad NewClassPage');
    }

    addClass() {
        this.crn.forEach(c => {
            c = parseInt(c);
            this.userProvider.addClass(this.semester + '' + this.year, c);
        })
        this.navCtrl.pop();
    }

}
