import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Content, AlertController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { UserProvider } from '../../providers/user/user';
import { ChatProvider } from '../../providers/chat/chat';
import { ModalController } from 'ionic-angular';

/**
 * Generated class for the GroupHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
    segment: 'page-group-home/:group/:semester/:year'
})
@Component({
    selector: 'page-group-home',
    templateUrl: 'group-home.html',
})
export class GroupHomePage {
    @ViewChild(Slides) slides: Slides;
    @ViewChild(Content) content: Content;

    group;
    crn;
    semester = '';
    year;
    page = 0;
    events = [];
    selectedEvent = new Array();
    isSelected = false;
    viewDate = new Date();
    viewEvents = new Array();
    dayClasses = new Array();

    users;
    schedule;
    times;
    greatestAvail = 0;

    chats = [];
    name = '';
    uid = '';
    offStatus:boolean = false;
    message = "";

    //calendar
    date = new Date();
    daysInThisMonth: any;
    daysInLastMonth: any;
    daysInNextMonth: any;
    monthNames = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    currentMonth: any;
    currentYear: any;
    currentDate: any;

    currentTab = '0';

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private modalCtrl: ModalController,
        private userProvider: UserProvider,
        private chatProvider: ChatProvider,
        private alertCtrl: AlertController
    ) {
        this.message = '';
        this.uid = this.userProvider.getUser();
        this.userProvider.getName().on('value', resp => {
            this.name = resp.val().name;
        })
        this.crn = this.navParams.get('group');
        this.semester = this.navParams.get('semester');
        this.year = this.navParams.get('year')
        this.userProvider.getClass(this.crn, this.semester, this.year).on('value', resp => {
            this.group = resp.val();
        })

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad GroupHomePage');
        this.getEvents();
        this.getChats();
        this.getClasses();
    }

    timetoNumebr(time){
        let stime = time.split(':');
        let ntime = parseInt(stime[0]);
        return ntime;
    }

    getClasses(){
        this.userProvider.getAllUsers().on('value', resp => {
            this.users = snapshotToArray(resp);
            let schedule = new Array();
            let days = ['S','M', 'T', 'W', 'R', 'F','A'];
            for(var i = 0; i < 7; i ++){
                schedule[i] = new Array();
                for(var j = 0; j < 15; j ++){
                    schedule[i][j] = 0;
                }
            }
            this.users.forEach(item => {
                if(item.classes && item.classes[this.year] && item.classes[this.year][this.semester]){
                    let userClasses = item.classes[this.year][this.semester];
                    if(userClasses && userClasses[this.group.crn]){
                        let keys = Object.keys(userClasses);
                        for(let i = 0; i < 7; i ++){
                            for(let j = 0; j < 15; j ++){
                                let isClass = false;
                                keys.forEach(element => {
                                    const day = userClasses[element].days.split('');
                                    const time = userClasses[element].time.split(' ');
                                    let istart = time[0];
                                    let iend = time [2];
                                    if(this.timetoNumebr(istart) <= j+8 && this.timetoNumebr(iend) >= j+8 && (days.indexOf(day[0]) == i || (day[1] && days.indexOf(day[1]) == i) || (day[2] && days.indexOf(day[2]) == i ) || (day[3] && days.indexOf(day[3]) == i))){
                                        isClass = true
                                    }
                                });
                                if(!isClass){
                                    schedule[i][j] ++;
                                    if(schedule[i][j] > this.greatestAvail){
                                        this.greatestAvail = schedule[i][j];
                                    }
                                }
                            }
                        }
                        
                    }
                }
            });
            this.generateTimes(8, 22);
            this.schedule = schedule;
        });
            
    }

    generateTimes(start: number, finish: number){
        this.times = [];
        for(var i = start; i <= finish; i ++){
            this.times.push(new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDay(), Math.floor(i),0,0));
        }
    }

    eventList(days){
        let events = this.events;
        let viewEvents = this.viewEvents;
        let date = this.date;
        for(var i = 0; i < days; i ++){
            var thisDate1 = new Date(date.getFullYear(), (date.getMonth() + 1), i,0,0,0);
            events.forEach(event => {
                let e = new Date(event.datetime);
                if (e.getFullYear() == thisDate1.getFullYear() && e.getMonth() == thisDate1.getMonth() && e.getDate() == thisDate1.getDate()){
                    viewEvents[i].push(event);
                }
            });
        }
        this.viewEvents = viewEvents;
    }

    getChats(){
        this.chatProvider.getMessages(this.year, this.semester, this.crn).on('value', resp => {
            this.chats = [];
            this.chats = snapshotToArray(resp);
          });
    }

    sendMessage() {
        this.chatProvider.sendMessage(this.message, this.uid, this.name, this.crn, this.semester, this.year);
        this.message = '';
      }
      

    getEvents() {
        this.chatProvider.getEvents(this.semester, this.year, this.crn).on('value', resp => {
            this.events = snapshotToArray(resp);
            this.getDaysOfMonth();
            this.getTodayEvents();
        })
    }


    swipe(e) {
        if (e.direction == 2) {
            if (this.page == 2) {
                this.page = 0;
            }
            else {
                this.page++;
            }
        }
        else if (e.direction == 4) {
            if (this.page == 0) {
                this.page = 2;
            }
            else {
                this.page--;
            }
        }
    }

    newEventPage(day?) {
        let newEvent = this.modalCtrl.create('NewEventPage', { crn: this.crn, semester: this.semester, year: this.year, day});
        newEvent.present();
    }

    viewEvent(event) {
        if(event.creator == this.uid){
            let alert = this.alertCtrl.create({
                title: event.title,
                subTitle: 'At: '+event.location,
                message: event.description,
                buttons: [
                    {
                      text: 'Edit',
                      handler: () => {
                        let editEvent = this.modalCtrl.create('EditEventPage', {event: event, crn: this.crn, semester: this.semester, year: this.year});
                        editEvent.present();
                      }
                    },
                    {
                      text: 'Cancel',
                      role: 'cancel'
                    }
                  ]
            });
            alert.present();
        }
        else{
           let alert = this.alertCtrl.create({
                title: event.title,
                subTitle: 'At: '+event.location,
                message: event.description
            });
            alert.present(); 
        }
    }

    getDaysOfMonth() {
        this.daysInThisMonth = new Array();
        this.daysInLastMonth = new Array();
        this.daysInNextMonth = new Array();
        this.viewEvents = new Array();;
        this.currentMonth = this.monthNames[this.date.getMonth()];
        this.currentYear = this.date.getFullYear();
        if (this.date.getMonth() === new Date().getMonth()) {
            this.currentDate = new Date().getDate();
        } else {
            this.currentDate = 999;
        }

        var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
        var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
        for (var i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
            this.daysInLastMonth.push(i);
        }

        var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
        for (i = 0; i < thisNumOfDays; i++) {
            this.daysInThisMonth.push(i + 1);
            this.viewEvents[i+1] = new Array();
        }

        var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
        for (i = 0; i < (6 - lastDayThisMonth); i++) {
            this.daysInNextMonth.push(i + 1);
        }
        var totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
        if (totalDays < 36) {
            for (i = (7 - lastDayThisMonth); i < ((7 - lastDayThisMonth) + 7); i++) {
                this.daysInNextMonth.push(i);
            }
        }
        this.eventList(thisNumOfDays);
    }

    goToLastMonth() {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
        this.getDaysOfMonth();
    }

    goToNextMonth() {
        this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
        this.getDaysOfMonth();
    }

    checkEvent(day) {
        var hasEvent = false;
        var thisDate1 = new Date(this.date.getFullYear(), this.date.getMonth(), day,0,0,0);
        this.events.forEach(event => {
            let e = new Date(event.datetime);
            if (e.getFullYear() == thisDate1.getFullYear() && e.getMonth() == thisDate1.getMonth() && e.getDate() == thisDate1.getDate()){
                hasEvent = true;
            }
        });
        return hasEvent;
    }

    selectDay(day) {
        var thisDate1 = new Date(this.date.getFullYear(), this.date.getMonth(), day);
        this.dayClasses = [];
        this.dayClasses[day] = 'selected-date';
        this.selectedEvent = [];
        this.events.forEach(event => {
            let e = new Date(event.datetime);
            if (e.getFullYear() == thisDate1.getFullYear() && e.getMonth() == thisDate1.getMonth() && e.getDate() == thisDate1.getDate()) {
                this.isSelected = true;
                this.selectedEvent.push(event);
            }
        });
        this.viewDate = thisDate1;
    }

    formatDate(date:Date): string {
        let timestring = date.toLocaleTimeString().split(':');
        return timestring[0]+':'+timestring[1];
    }

    formatDatetime(datetime){
        let d = new Date(datetime);
        let h = d.getHours();
        let n = "AM";
        if(h > 12){
            h -= 12;
            n = "PM";
        }
        let m = d.getMinutes();
        if(m == 0){
            return h+":00 "+n;
        }
        return h+":"+m+" "+n;
    }

    getTodayEvents(){
        this.selectedEvent = [];
        let viewDate = this.viewDate;
        this.events.forEach(event => {
            let e = new Date(event.datetime);
            if (e.getFullYear() == viewDate.getFullYear() && e.getMonth() == viewDate.getMonth() && e.getDate() == viewDate.getDate()) {
                this.isSelected = true;
                this.selectedEvent.push(event);
            }
        });
    }

    dismiss(){
        this.navCtrl.setRoot('SchedulePage', {semester: this.semester});
    }

}

export const snapshotToArray = snapshot => {
    let returnArr = [];
    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};