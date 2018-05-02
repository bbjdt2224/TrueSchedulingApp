import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Content } from 'ionic-angular';
import { GroupRelation } from '../../classes/grouprelation';
import { Group } from '../../classes/group';
import { MenuController } from 'ionic-angular';
import { SchedulePage } from '../schedule/schedule';
import { ViewChild } from '@angular/core';
import { NewEventPage } from '../new-event/new-event';
import { EventsProvider } from '../../providers/events/events';
import { UserProvider } from '../../providers/user/user';
import { ChatProvider } from '../../providers/chat/chat';
import { Events } from '../../classes/events';
import { ModalController } from 'ionic-angular';
import { parseDate } from 'ionic-angular/util/datetime-util';
import * as firebase from 'firebase';

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
    @ViewChild(Slides) slides: Slides;
    @ViewChild(Content) content: Content;

    groupRelation = new GroupRelation();
    currDate = new Date();
    page = 0;
    events: Events[] = new Array();
    selectedEvent: Events[] = new Array();
    isSelected = false;
    viewDate = new Date();
    viewEvents: Events[][] = new Array();

    chats = [];
    name = '';
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

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private menuCtrl: MenuController,
        private eventsProvider: EventsProvider,
        private modalCtrl: ModalController,
        private userProvider: UserProvider,
        private chatProvider: ChatProvider
    ) {
        this.groupRelation.group = new Group();

        this.message = '';
        //this.name = this.userProvider.getUser();

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad GroupHomePage');
        this.groupRelation = this.navParams.get('group');
        this.getEvents();
        this.menuCtrl.enable(true, 'semeser');
        this.menuCtrl.enable(false, 'groups');
        this.getChats();
    }

    eventList(days){
        let events = this.events;
        let viewEvents = this.viewEvents;
        let date = this.date;
        for(var i = 0; i < days; i ++){
            var thisDate1 = new Date(date.getFullYear(), (date.getMonth() + 1), i,0,0,0);
            events.forEach(event => {
                let e = parseDate(event.datetime);
                if (e.year == thisDate1.getFullYear() && e.month == thisDate1.getMonth() && e.day == thisDate1.getDate()){
                    viewEvents[i].push(event);
                }
            });
        }
        this.viewEvents = viewEvents;
    }

    getChats(){
        firebase.database().ref('groups/'+this.groupRelation.group.groupCode+'/chats').on('value', resp => {
            this.chats = [];
            this.chats = snapshotToArray(resp);
            setTimeout(() => {
              if(this.offStatus === false) {
                this.content.scrollToBottom(300);
              }
            }, 1000);
          });
    }

    sendMessage() {
        this.chatProvider.sendMessage(this.message, this.name, this.groupRelation.group.groupCode);
        this.message = '';
      }
      

    goback() {
        let currSemester = this.findSemester();
        this.navCtrl.setRoot(SchedulePage, { semester: currSemester });
    }

    getEvents() {
        this.eventsProvider.getEvents(this.groupRelation.groupId).subscribe(events => {
            this.events = events;
            this.getDaysOfMonth();
        })
    }

    findSemester(): String {
        if (this.currDate.getMonth() < 4) {
            return 'Spring';
        }
        else if (this.currDate.getMonth() >= 4 && this.currDate.getMonth() <= 6) {
            return 'Summer I';
        }
        else if (this.currDate.getMonth() >= 6 && this.currDate.getMonth() <= 8) {
            return 'Summer II';
        }
        else {
            return 'Fall';
        }
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

    setPage(page: number) {
        this.slides.slideTo(page, 500);
        this.menuCtrl.close();
    }

    getPage(): number {
        return this.slides.getActiveIndex();
    }

    newEventPage() {
        let newEvent = this.modalCtrl.create(NewEventPage, { group: this.groupRelation });
        newEvent.present();
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
        //var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0).getDate();
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
        var thisDate1 = new Date(this.date.getFullYear(), (this.date.getMonth() + 1), day,0,0,0);
        this.events.forEach(event => {
            let e = parseDate(event.datetime);
            if (e.year == thisDate1.getFullYear() && e.month == thisDate1.getMonth() && e.day == thisDate1.getDate()){
                hasEvent = true;
            }
        });
        return hasEvent;
    }

    selectDay(day) {
        var thisDate1 = new Date(this.date.getFullYear(), (this.date.getMonth() + 1), day);
        this.events.forEach(event => {
            if (event.datetime == thisDate1) {
                this.isSelected = true;
                this.selectedEvent.push(event);
            }
        });

        this.viewDate = thisDate1;
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