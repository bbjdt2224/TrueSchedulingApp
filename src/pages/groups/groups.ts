import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { NewGroupPage } from '../new-group/new-group';
import { GroupHomePage } from '../group-home/group-home';
import { UserProvider } from '../../providers/user/user';
import { snapshotToArray } from '../../providers/user/user';
import { GroupRelation } from '../../classes/grouprelation';

/**
 * Generated class for the GroupsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-groups',
    templateUrl: 'groups.html',
})
export class GroupsPage {

    groups = [];
    semester = '';
    year: number;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private alertCtrl: AlertController,
        private userProvider: UserProvider
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad GroupsPage');
        this.getGroups();
        this.semester = this.navParams.get('semester');
        this.year = this.navParams.get('year');
    }

    ionViewDidEnter() {
        this.getGroups();
    }

    getGroups() {
        this.userProvider.getClasses(this.semester, this.year).on('value', resp => {
            this.groups = snapshotToArray(resp);
        });
    }

    newGroup() {
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
                        // this.groupsProvider.joinGroup(data.code).subscribe(result => {
                        //     if (result.message == 'fail') {
                        //         this.alertCtrl.create({
                        //             title: 'Wrong Code',
                        //             message: 'You entered an invalid code',
                        //             buttons: ['OK']
                        //         }).present();
                        //     }
                        // })
                    }
                }
            ]
        });
        prompt.present();
    }

    groupHome(crn) {
        this.navCtrl.setRoot(GroupHomePage, { group: crn, semester: this.semester+''+this.year})
    }

}
