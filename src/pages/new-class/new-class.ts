import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserClasses } from '../../classes/userclasses';
import { classes } from '../../classes/classes';
import { ClassesProvider } from '../../providers/classes/classes';

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

  c = new UserClasses();
  crn = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private classesProvider: ClassesProvider
  ) {
    this.c.class = new classes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewClassPage');
    this.c.class.semester = this.navParams.get('semester');
    this.c.class.year = this.navParams.get('year');
  }

  addClass(){
    this.classesProvider.addClass(this.c.class, this.crn).subscribe(response => {
      if(response){
        this.navCtrl.pop();
      }
    })
  }

}
