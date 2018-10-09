import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { MenuController } from 'ionic-angular';
import { parseDate } from 'ionic-angular/util/datetime-util';
import { UserProvider } from '../../providers/user/user';
import { snapshotToArray } from '../../providers/user/user';
import { LoginPage } from '../login/login';



@IonicPage({
    segment: 'page-schedule/:semester'
})
@Component({
    selector: 'page-schedule',
    templateUrl: 'schedule.html',
})
export class SchedulePage {

    currDate = new Date();
    currSemester: string;
    days = ['M', 'T', 'W', 'R', 'F'];
    schedule;
    regularSchedule;
    finalsSchedule;
    classes = [];
    finals = [];
    times: Date[];
    colors: String[][];
    regularColors: String[][];
    finalsColors: String[][];
    colorClasses = ['class1', 'class2', 'class3', 'class4', 'class5']
    semesterClass = ['currentSemester', 'otherSemester', 'otherSemester', 'otherSemester'];
    regularStart = 10;
    regularEnd = 15;
    finalStart = 10;
    finalEnd = 15;

    currentTab = "0";

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public modalCtrl: ModalController,
        private userProvider: UserProvider
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SchedulePage');
        this.currSemester = this.navParams.get('semester');
        this.changeSemesterColors(this.currSemester);
        this.getClasses();
    }

    ionViewDidEnter() {
        this.changeSemesterColors(this.currSemester);
        this.getClasses();
        this.menuCtrl.close();
    }


    generateTimes(start: number, finish: number) {
        this.times = [];
        for (var i = start; i <= finish; i += 0.5) {
            let min = 0;
            if (i % 1 > 0) {
                min = 30;
            }
            this.times.push(new Date(this.currDate.getFullYear(), this.currDate.getMonth(), this.currDate.getDay(), Math.floor(i), min, 0));
        }
    }

    getClasses() {
        this.userProvider.getClasses(this.currSemester, this.currDate.getFullYear()).on('value', resp => {
            this.classes = snapshotToArray(resp);
            this.getFinals();
            let start = 10;
            let end = 15;
            let schedule = new Array();
            let colors = new Array();
            let colorClasses = this.colorClasses;
            for (var i = 0; i < 5; i++) {
                schedule[i] = new Array();
                colors[i] = new Array();
            }
            this.classes.forEach(item => {
                const time = item.time.split(' ');
                let istart = time[0];
                let iend = time[2];
                if (this.getDate(istart).getHours() < start) {
                    start = this.getDate(istart).getHours();
                }
                if (this.getDate(iend).getHours() > end) {
                    end = this.getDate(iend).getHours() + 1;
                }
            });
            this.regularStart = start;
            this.regularEnd = end;

            this.generateTimes(start, end);

            let colorIndex = 0;
            this.classes.forEach(item => {
                const time = item.time.split(' ');
                let istart = time[0];
                let iend = time[2];
                let days = item.days.split('');
                let itemStart = parseDate(istart);
                let itemEnd = parseDate(iend);
                let itms = itemStart.hour + (itemStart.minute / 60);
                let itme = itemEnd.hour + (itemEnd.minute / 60);
                days.forEach(day => {
                    schedule[this.days.indexOf(day)][this.getIndex(start, itms)] = item;
                    for (var i = itms; i < itme; i += 0.5) {
                        colors[this.days.indexOf(day)][this.getIndex(start, i)] = colorClasses[colorIndex];
                        schedule[this.days.indexOf(day)][this.getIndex(start, i)] = item;
                    }
                });
                colorIndex++;
            });
            this.regularSchedule = schedule;
            this.schedule = this.regularSchedule;
            this.regularColors = colors;
            this.colors = this.regularColors;
        });

    }

    getFinals() {
        const timeConversions = [];
        timeConversions[1] = "08:00 - 10:00";
        timeConversions[2] = "10:15 - 12:15";
        timeConversions[3] = "12:30 - 14:30";
        timeConversions[4] = "14:45 - 16:45";
        timeConversions[5] = "17:00 - 19:00";
        timeConversions[6] = "19:15 - 21:15";
        this.userProvider.getFinals(this.currSemester, this.currDate.getFullYear()).on('value', resp => {
            this.finals = snapshotToArray(resp);
            if (this.finals.length > 0) {
                let start = 10;
                let end = 15;
                let schedule = new Array();
                let colors = new Array();
                let colorClasses = this.colorClasses;
                for (var i = 0; i < 5; i++) {
                    schedule[i] = new Array();
                    colors[i] = new Array();
                }
                this.classes.forEach(item => {
                    let block = item.time.charAt(0);
                    block += item.time.charAt(1);

                    if (block > 17) {
                        block = 17;
                    }

                    if (block > 12) {
                        block = (block - 12).toString();
                    }
                    if (block.charAt(0) == 0) {
                        block = block.charAt(1);
                    }

                    const day = item.days.charAt(0).toLowerCase();
                    if (day === 'm' || day === 't') {
                        const time = timeConversions[this.finals.find(cls => {
                            return cls.key == day + block;
                        }).time].split(' ');
                        let istart = time[0];
                        let iend = time[2];

                        if (this.getDate(istart).getHours() < start) {
                            start = this.getDate(istart).getHours();
                        }
                        if (this.getDate(iend).getHours() > end) {
                            end = this.getDate(iend).getHours() + 1;
                        }
                    }
                });
                this.finalStart = start;
                this.finalEnd = end;

                let colorIndex = 0;
                this.classes.forEach(item => {
                    let block = item.time.charAt(0);
                    block += item.time.charAt(1);
                    if (block > 17) {
                        block = 17;
                    }

                    if (block > 12) {
                        block = (block - 12).toString();
                    }
                    if (block.charAt(0) == 0) {
                        block = block.charAt(1);
                    }
                    const fday = item.days.charAt(0).toLowerCase();
                    if (fday === 'm' || fday === 't') {
                        const time = timeConversions[this.finals.find(cls => {
                            return cls.key == fday + block;
                        }).time].split(' ');
                        let istart = time[0];
                        let iend = time[2];
                        let day = this.finals.find(cls => {
                            return cls.key == fday + block;
                        }).day;
                        let itemStart = parseDate(istart);
                        let itemEnd = parseDate(iend);
                        let itms = itemStart.hour + (itemStart.minute / 60);
                        let itme = itemEnd.hour + (itemEnd.minute / 60);
                        let currClass = JSON.parse(JSON.stringify(item));
                        currClass.days = day.charAt(0).toUpperCase();
                        currClass.time = time.join(' ');
                        schedule[this.days.indexOf(day.charAt(0).toUpperCase())][this.getIndex(start, itms)] = currClass;
                        for (var i = itms; i < itme; i += 0.5) {
                            colors[this.days.indexOf(day.charAt(0).toUpperCase())][this.getIndex(start, i)] = colorClasses[colorIndex];
                        }
                        colorIndex++;
                    }
                });
                this.finalsSchedule = schedule;
                this.finalsColors = colors;
            }
            else{
                this.finalsSchedule = [];
                this.finalsColors = [];
            }
        });
    }

    swapSchedule() {
        if (this.currentTab === '0') {
            this.schedule = this.regularSchedule;
            this.colors = this.regularColors;
            this.generateTimes(this.regularStart, this.regularEnd);
        }
        else {
            this.schedule = this.finalsSchedule;
            this.colors = this.finalsColors;
            this.generateTimes(this.finalStart, this.finalEnd);
        }
    }

    hour(time: string) {
        return parseDate(time).hour;
    }

    getIndex(start: number, time: number): number {
        let counter = 0;
        for (var i = start; i < time; i += 0.5) {
            counter++;
        }
        return counter;
    }


    public getDate(time: string): Date {
        let stime = parseDate(time);
        return new Date(this.currDate.getFullYear(), this.currDate.getMonth(), this.currDate.getDate(), stime.hour, stime.minute, stime.second);
    }

    public viewClass(c) {
        let classModal = this.modalCtrl.create('ClassModalPage', { class: c, semester: this.currSemester, year: this.currDate.getFullYear() });
        classModal.present();
    }

    public formatDate(date: Date): string {
        let timestring = date.toLocaleTimeString().split(':');
        return timestring[0] + ':' + timestring[1];
    }

    public newClass() {
        this.navCtrl.push('NewClassPage', { semester: this.currSemester, year: this.currDate.getFullYear() });
    }

    public changeSemester(semester: string) {
        if(this.currDate.getMonth() >= 8 && semester === 'Spring'){
            this.currDate.setFullYear(this.currDate.getFullYear() + 1);
        }
        else{
            this.currDate = new Date();
        }
        this.currSemester = semester;
        this.changeSemesterColors(this.currSemester);
        this.getClasses();
        this.menuCtrl.close();
    }

    signout() {
        this.navCtrl.setRoot(LoginPage);
    }

    changeSemesterColors(semester) {
        if (semester == 'Spring') {
            this.semesterClass = ['currentSemester', 'otherSemester', 'otherSemester', 'otherSemester'];
        }
        else if (semester == 'Summer I') {
            this.semesterClass = ['otherSemester', 'currentSemester', 'otherSemester', 'otherSemester'];
        }
        else if (semester == 'Summer II') {
            this.semesterClass = ['otherSemester', 'otherSemester', 'currentSemester', 'otherSemester'];
        }
        else if (semester == 'Fall') {
            this.semesterClass = ['otherSemester', 'otherSemester', 'otherSemester', 'currentSemester'];
        }
    }


}
