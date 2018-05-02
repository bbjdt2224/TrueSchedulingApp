import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ClassesProvider } from '../../providers/classes/classes';
import { classes } from '../../classes/classes';
import { UserClasses } from '../../classes/userclasses';
import { NewClassPage } from '../new-class/new-class';
import { MenuController } from 'ionic-angular';
import { ClassModalPage } from '../class-modal/class-modal';
import { parseDate } from 'ionic-angular/util/datetime-util';
import { GroupsPage } from '../groups/groups';
import { UserProvider } from '../../providers/user/user';


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
    days = ['M', 'T', 'W', 'R', 'F'];
    schedule: UserClasses[][];
    classes: UserClasses[];
    times: Date[];
    colors: String[][];
    colorClasses = ['class1','class2','class3','class4','class5']

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private classesProvider: ClassesProvider,
        public menuCtrl: MenuController,
        public modalCtrl: ModalController,
        private userProvider: UserProvider
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SchedulePage');
        this.currSemester = this.navParams.get('semester');
        this.getClasses();
        console.log(this.userProvider.getUser());
    }

    ionViewDidEnter() {
        this.getClasses();
        this.menuCtrl.close();
        // this.menuCtrl.enable(true, 'semester');
        // this.menuCtrl.enable(false, 'groups');
    }


    generateTimes(start: number, finish: number){
        this.times = [];
        for(var i = start; i <= finish; i += 0.5){
            let min = 0;
            if(i%1 > 0){
                min = 30;
            }
            this.times.push(new Date(this.currDate.getFullYear(), this.currDate.getMonth(), this.currDate.getDay(), Math.floor(i),min,0));
        }
    }

    getClasses(){
        this.classesProvider.getClasses(this.currSemester,this.currDate.getFullYear()).subscribe(classes => 
        {
            this.classes = classes;
            let start = 10;
            let end = 15;
            let schedule = new Array();
            let colors = new Array();
            let colorClasses = this.colorClasses;
            for(var i = 0; i < 5; i ++){
                schedule[i] = new Array();
                colors[i] = new Array();
            }
            this.classes.forEach(item => {
                const time = item.class.time.split(' ');
                let istart = time[0];
                let iend = time [2];
                if (this.getDate(istart).getHours() < start){
                    start = this.getDate(istart).getHours();
                }
                if (this.getDate(iend).getHours() > end){
                    end = this.getDate(iend).getHours()+1;
                }
            });
            this.generateTimes(start, end);

            let colorIndex = 0;
            this.classes.forEach(item => {
                const time = item.class.time.split(' ');
                let istart = time[0];
                let iend = time [2];
                let days = item.class.days.split('');
                let itemStart = parseDate(istart);
                let itemEnd = parseDate(iend);
                let itms = itemStart.hour+(itemStart.minute/60);
                let itme = itemEnd.hour+(itemEnd.minute/60);
                days.forEach(day => {
                    schedule[this.days.indexOf(day)][this.getIndex(start,itms)] = item;
                    for(var i = itms; i < itme; i += 0.5){
                        colors[this.days.indexOf(day)][this.getIndex(start, i)] = colorClasses[colorIndex];
                    }
                });
            });
            this.schedule = schedule;
            this.colors = colors;
        });
    }

    hour(time: string){
        return parseDate(time).hour;
    }

    getIndex(start: number, time: number): number {
        let counter = 0;
        for(var i = start; i < time; i += 0.5){
            counter ++;
        }
        return counter;
    }


    public getDate(time: string): Date{
        let stime = parseDate(time);
        return new Date(this.currDate.getFullYear(), this.currDate.getMonth(), this.currDate.getDate(), stime.hour, stime.minute, stime.second);
    }

    public viewClass(c: UserClasses) {
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

    groupsPage(){
        this.navCtrl.push(GroupsPage);
    }


}
