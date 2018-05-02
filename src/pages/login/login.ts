import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { SchedulePage } from '../schedule/schedule';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    email = '';
    password = '';
    errormsg = '';
    currDate = new Date();

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private userProvider: UserProvider
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    login(){
        this.userProvider.login(this.email, this.password).subscribe(user => {
            if(user){
                let semester = this.findSemester();
                this.navCtrl.setRoot(SchedulePage, {semester: semester});
            }
            else{
                this.errormsg = 'The email or password is incorrect';
            }
        });
        
    }

    signup(){
        this.navCtrl.push(SignUpPage);
    }

    findSemester(): String {
        if (this.currDate.getMonth() < 4) {
            return 'Spring';
        }
        else if(this.currDate.getMonth() >= 4 && this.currDate.getMonth() <= 6 ){
            return 'Summer I';
        }
        else if(this.currDate.getMonth() >= 6 && this.currDate.getMonth() <= 8){
            return 'Summer II';
        }
        else{
            return 'Fall';
        }
    }

}
