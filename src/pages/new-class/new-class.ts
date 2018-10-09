import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { snapshotToArray } from '../group-home/group-home';
import { ClassOutline } from '../../models/class';


@IonicPage()
@Component({
    selector: 'page-new-class',
    templateUrl: 'new-class.html',
})
export class NewClassPage {

    semester: string;
    year;
    crn = [];
    errors = [];

    classList: ClassOutline[] = [];
    allClasses = [];
    studentClasses = [];
    searchKey = "";

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private userProvider: UserProvider,
        private taostCtrl: ToastController
    ) {
        this.semester = this.navParams.get('semester');
        this.year = this.navParams.get('year');
        this.getAllClasses();
        this.getStudentClasses();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad NewClassPage');
    }

    addClass(crn, title) {
        this.userProvider.addClass(this.semester, this.year, crn);
         this.taostCtrl.create({
            message: title + ' Added',
            duration: 3000,
            position: 'top'
        }).present();
    }

    getStudentClasses() {
        this.userProvider.getClasses(this.semester, this.year).on('value', resp => {
            this.studentClasses = snapshotToArray(resp);
        });
    }

    getAllClasses() {
        this.userProvider.findClass(this.semester, this.year).on('value', resp => {
            this.allClasses = snapshotToArray(resp);
        });
    }

    searchClass(key: string) {
        key = key.toLowerCase();
        const keySplit = key.split(' ');
        const results = this.allClasses.filter(oneClass => {
            let hasAll = true;
            for (let i = 0; i < keySplit.length; i++) {
                if (oneClass.title.toLowerCase().indexOf(keySplit[i]) < 0) {
                    hasAll = false;
                }
            }
            return hasAll;
        }).splice(0, 50);
        this.classList = results.map(oneClass => { return new ClassOutline(oneClass); })
    }

    hasClass(crn) {
        return this.studentClasses.map(c => { return c.crn }).indexOf(crn) >= 0;
    }

    goBack() {
        this.navCtrl.pop();
    }

    formatTime(time) {
        const split = time.split(' ');
        let firstPost = "AM";
        let secondPost = "AM";
        if (split.length > 1) {
            const first = split[0].split(':');
            const second = split[2].split(':');
            if (first[0] > 12) {
                first[0] = (first[0] - 12).toString();
                firstPost = "PM"
            }
            if (second[0] > 12) {
                second[0] = (second[0] - 12).toString();
                secondPost = "PM"
            }
            return `${first.join(':')} ${firstPost} - ${second.join(':')} ${secondPost}`;
        }
        else{
            return "";
        }
    }

}
