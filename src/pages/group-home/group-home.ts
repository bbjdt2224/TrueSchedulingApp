import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Content, AlertController } from 'ionic-angular';
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
    group;
    crn;
    semester = '';
    page = 0;
    events = [];
    selectedEvent: Events[] = new Array();
    isSelected = false;
    viewDate = new Date();
    viewEvents: Events[][] = new Array();

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

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private menuCtrl: MenuController,
        private eventsProvider: EventsProvider,
        private modalCtrl: ModalController,
        private userProvider: UserProvider,
        private chatProvider: ChatProvider,
        private alertCtrl: AlertController
    ) {
        this.groupRelation.group = new Group();

        this.message = '';
        this.uid = this.userProvider.getUser();
        this.userProvider.getName().on('value', resp => {
            this.name = resp.val().name;
        })
        this.crn = this.navParams.get('group');
        this.semester = this.navParams.get('semester');
        this.userProvider.getClass(this.crn, this.semester).on('value', resp => {
            this.group = resp.val();
        })

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad GroupHomePage');
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
                let e = new Date(event.datetime);
                if (e.getFullYear() == thisDate1.getFullYear() && e.getMonth() == thisDate1.getMonth() && e.getDate() == thisDate1.getDate()){
                    viewEvents[i].push(event);
                }
            });
        }
        this.viewEvents = viewEvents;
    }

    getChats(){
        firebase.database().ref('classes/'+this.semester+'/'+this.crn+'/messages').on('value', resp => {
            this.chats = [];
            this.chats = snapshotToArray(resp);
            // setTimeout(() => {
            //   if(this.offStatus === false) {
            //     this.content.scrollToBottom(300);
            //   }
            // }, 1000);
          });
    }

    sendMessage() {
        this.chatProvider.sendMessage(this.message, this.uid, this.name, this.crn, this.semester);
        this.message = '';
      }
      

    goback() {
        this.navCtrl.setRoot(SchedulePage, { semester: this.semester });
    }

    getEvents() {
        this.chatProvider.getEvents(this.semester, this.crn).on('value', resp => {
            this.events = snapshotToArray(resp);
            this.getDaysOfMonth();
        })
    }

    getPage(){
        return this.slides.getActiveIndex()
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

    newEventPage() {
        let newEvent = this.modalCtrl.create(NewEventPage, { crn: this.crn, semester: this.semester});
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
                        // make edit event page ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        // let editEvent = this.modalCtrl.create(NewEventPage, {event: event, crn: this.crn, semester: this.semester});
                        // editEvent.present();
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

    dismiss(){
        this.navCtrl.setRoot(SchedulePage, {semester: this.semester.substring(0, this.semester.length-4)});
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