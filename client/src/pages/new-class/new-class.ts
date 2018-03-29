import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  checked = [];
  c = new classes();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private classesProvider: ClassesProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewClassPage');
    this.c.semester = this.navParams.get('semester');
    this.c.year = this.navParams.get('year');
  }

  addClass(){
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
    this.classesProvider.addClass(this.c).subscribe(response => {
      if(response){
        this.navCtrl.pop();
      }
    })
  }

}
