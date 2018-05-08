import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-sign-up',
    templateUrl: 'sign-up.html',
})
export class SignUpPage {

    email = '';
    password = '';
    name = '';
    cpassword = '';
    error = '';

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private userProvider: UserProvider
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SignUpPage');
    }

    signUp() {
        if (this.password === this.cpassword) {
            this.userProvider.signup(this.email, this.password).then( success => {
                this.userProvider.addUser(this.name, success.uid);
                this.navCtrl.setRoot('SchedulePage');
            },
        error=> this.error = error);
        }
        else{
            this.error = 'The password and confirmation password do not match';
        }
    }

}
