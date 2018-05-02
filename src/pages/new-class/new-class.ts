import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserClasses } from '../../classes/userclasses';
import { classes } from '../../classes/classes';
import { ClassesProvider } from '../../providers/classes/classes';
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

  crn = 40281;
  semester = '';
  year = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private classesProvider: ClassesProvider,
    private userProvider: UserProvider
  ) {
    this.semester = 'Fall';
    this.year = '2018'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewClassPage');
  }

  addClass(){
    this.classesProvider.addClass(this.semester+''+this.year, this.crn, this.userProvider.getUser());
  }

}
