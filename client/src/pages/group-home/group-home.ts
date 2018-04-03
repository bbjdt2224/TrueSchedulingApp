import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GroupRelation } from '../../classes/grouprelation';
import { Group } from '../../classes/group';
import { MenuController } from 'ionic-angular';
import { SchedulePage } from '../schedule/schedule';
import { Calendar } from '@ionic-native/calendar';

/**
 * Generated class for the GroupHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-home',
  templateUrl: 'group-home.html',
})
export class GroupHomePage {

  groupRelation = new GroupRelation();
  currDate = new Date();  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private menuCtrl: MenuController,
    private calendar: Calendar
  ) {
    this.groupRelation.group = new Group();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupHomePage');
    this.groupRelation = this.navParams.get('group');
    this.menuCtrl.enable(true, 'groupMenu');
    this.menuCtrl.enable(false, 'groups');
    this.calendar.createCalendar('cal').then();
  }
  goback(){
    let currSemester = this.findSemester();
    this.navCtrl.setRoot(SchedulePage, {semester: currSemester});
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
