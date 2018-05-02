import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { SchedulePage } from '../schedule/schedule';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private userProvider: UserProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  signUp(){
    if(this.password === this.cpassword){
      this.userProvider.signup(this.email, this.password, this.name).subscribe(user => {
        this.navCtrl.setRoot(SchedulePage);
      })
    }
  }

}
