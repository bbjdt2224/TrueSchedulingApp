import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';

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
        private userProvider: UserProvider,
        private storage: Storage
    ) {
        this.storage.get('email').then(email => this.email = email);
        this.storage.get(this.password).then(pass => this.password = pass);
        if(this.email.length > 1  && this.password.length > 1){
            this.login();
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    login(){
        this.userProvider.login(this.email, this.password).then(
            success => {this.userProvider.setUser(success.uid);
                this.storage.set('email', this.email);
                this.storage.set('password', this.password);
                this.navCtrl.setRoot('SchedulePage', {semester: this.findSemester()})
            },
            error => this.errormsg = error
        );
        
    }

    signup(){
        this.navCtrl.push('SignUpPage');
    }

    findSemester(): String {
        if (this.currDate.getMonth()+1 < 4) {
            return 'Spring';
        }
        else if(this.currDate.getMonth()+1 >= 4 && this.currDate.getMonth()+1 <= 6 ){
            return 'Summer I';
        }
        else if(this.currDate.getMonth()+1 >= 6 && this.currDate.getMonth()+1 <= 8){
            return 'Summer II';
        }
        else{
            return 'Fall';
        }
    }

}
