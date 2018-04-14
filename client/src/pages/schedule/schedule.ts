import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ClassesProvider } from '../../providers/classes/classes';
import { GroupsProvider } from '../../providers/groups/groups';
import { classes } from '../../classes/classes';
import { GroupRelation } from '../../classes/grouprelation';
import { AlertController } from 'ionic-angular';
import { NewClassPage } from '../new-class/new-class';
import { MenuController } from 'ionic-angular';
import { ClassModalPage } from '../class-modal/class-modal';
import { NewGroupPage } from '../new-group/new-group';
import { GroupHomePage } from '../group-home/group-home';


/**
 * Generated class for the SchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-schedule',
    templateUrl: 'schedule.html',
})
export class SchedulePage {

    currDate = new Date();
    currSemester: string;
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    schedule: classes[];
    classes: classes[];
    times: Date[];
    visual: classes[];
    viewDate: boolean[];
    visualClass: string[];
    currentDay = this.days[this.currDate.getDay()];
    colorClasses = ['class1','class2','class3','class4','class5']
    groupRelations: GroupRelation[];

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private classesProvider: ClassesProvider,
        public alertCtrl: AlertController,
        public menuCtrl: MenuController,
        public modalCtrl: ModalController,
        private groupsProvider: GroupsProvider
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SchedulePage');
        this.currSemester = this.navParams.get('semester');
        this.getClasses();
        this.menuInit();
        this.getGroups();
    }

    ionViewDidEnter() {
        this.getClasses();
        this.menuInit();
        this.menuCtrl.close();
        this.getGroups();
    }

    getGroups(){
        this.groupsProvider.getGroups().subscribe(relations => {this.groupRelations = relations; console.log(relations)});
    }


    generateTimes(start: number, finish: number){
        this.times = [];
        const fpart = 'Fri Jan 01 1998 '
        const spart = ':00 UTC-0500 (Eastern Time (US & Canada)'
        for(var i = start; i <= finish; i += 0.5){
            let min = '00';
            if(i%1 > 0){
                min = '30';
            }
            this.times.push(new Date(fpart+Math.floor(i)+':'+min+spart));
        }
    }

    getClasses(){
        this.classesProvider.getClasses(this.currSemester,this.currDate.getFullYear()).subscribe(classes => {this.classes = classes; this.changeDays(); });
    }

    changeDays(){
        this.schedule = [];
        this.sortClasses();
    }

    sortClasses(){
        this.classes.forEach(item => {
                console.log(item.days);
                if(item.days.search(this.currentDay) >= 0){
                    this.schedule.push(item);
                }
        });
        this.generateVisual();
    }

    generateVisual(){
        let start = 10;
        let finish = 15;
        if(this.schedule){
            this.schedule.forEach(item => {
                if (this.getDate(item.start).getHours() < start){
                    start = this.getDate(item.start).getHours();
                }
                if (this.getDate(item.end).getHours() > finish){
                    finish = this.getDate(item.end).getHours()+1;
                }
            });
        }
        this.generateTimes(start, finish);
        if (this.schedule){
            this.visual = [];
            this.viewDate = [];
            this.visualClass = [];
            let colorIndex = 0;
            for (var i = 0; i < this.times.length; i ++) {
                this.schedule.forEach(item => {
                    if(this.times[i].getHours() == this.getDate(item.start).getHours() && this.times[i].getMinutes() == this.getDate(item.start).getMinutes()){
                        this.visual[i] = item;
                        this.viewDate[i] = true;
                        this.visualClass[i] = this.colorClasses[colorIndex];
                    }
                    else if(this.times[i] > this.getDate(item.start) && this.times[i] < this.getDate(item.end)){
                        this.visual[i] = item;
                        this.viewDate[i] = false;
                        this.visualClass[i] = this.colorClasses[colorIndex];
                    }
                    colorIndex ++;
                });
                colorIndex = 0;
            }
        }
    }

    public getDate(time: string): Date{
        return new Date('Fri Jan 01 1998 '+time+' UTC-0500 (Eastern Time (US & Canada)')
    }

    public viewClass(c: classes) {
        let classModal = this.modalCtrl.create(ClassModalPage, {class: c});
        classModal.present();
    }

    public formatDate(date:Date): string {
        let timestring = date.toLocaleTimeString().split(':');
        return timestring[0]+':'+timestring[1];
    }

    public newClass() {
        this.navCtrl.push(NewClassPage, {semester: this.currSemester, year: this.currDate.getFullYear()});
    }

    public changeSemester(semester: string){
        this.currSemester = semester;
        this.getClasses();
        this.menuCtrl.close();
    }

    swipeDays(e){
        if(e.direction == 2){
            if(this.currentDay == 'Saturday'){
                this.currentDay = 'Sunday';
            }
            else{
                this.currentDay = this.days[this.days.indexOf(this.currentDay)+1];
            }
        }
        else if (e.direction == 4){
            if (this.currentDay == 'Sunday'){
                this.currentDay = 'Saturday';
            }
            else{
                this.currentDay = this.days[this.days.indexOf(this.currentDay)-1];
            }
        }
    }

    menuInit(){
        this.menuCtrl.enable(true, 'main');
        this.menuCtrl.enable(false, 'semester');
        this.menuCtrl.enable(false, 'groups');
    }

    mainMenu(){
        this.menuCtrl.enable(true, 'main');
        this.menuCtrl.enable(false, 'semester');
        this.menuCtrl.enable(false, 'groups');
        this.menuCtrl.open();
    }

    semester(){
        this.menuCtrl.enable(false, 'main');
        this.menuCtrl.enable(true, 'semester');
        this.menuCtrl.enable(false, 'groups');
        this.menuCtrl.open();
    }

    groups(){
        this.menuCtrl.enable(false, 'main');
        this.menuCtrl.enable(false, 'semester');
        this.menuCtrl.enable(true, 'groups');
        this.menuCtrl.open();
    }

    newGroup(){
        this.navCtrl.push(NewGroupPage);
    }

    joinGroup() {
        let prompt = this.alertCtrl.create({
          title: 'Join Group',
          message: "Enter Group Number",
          inputs: [
            {
              name: 'code',
              placeholder: 'Code',
              type: 'number'
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
                
              }
            },
            {
              text: 'Join',
              handler: data => {
                this.groupsProvider.joinGroup(data.code).subscribe(result => {
                    if(result.message == 'fail'){
                        this.alertCtrl.create({
                            title: 'Wrong Code',
                            message: 'You entered an invalid code',
                            buttons: ['OK']
                        }).present();
                    }
                    this.menuCtrl.close();
                })
              }
            }
          ]
        });
        prompt.present();
      }

      groupHome(group: GroupRelation){
          this.navCtrl.setRoot(GroupHomePage, {group: group})
      }

}
