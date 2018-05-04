import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Group } from '../../classes/group';

/**
 * Generated class for the NewGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-new-group',
    templateUrl: 'new-group.html',
})
export class NewGroupPage {

    group = new Group();

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad NewGroupPage');
    }

    // addGroup() {
    //     let code = Math.floor(Math.random()*100000);

    //     this.groupsProvider.checkCode(code).subscribe(response => {
    //         if(response){
    //             this.group.groupCode = code;
    //             this.groupsProvider.newGroup(this.group).subscribe(done => {
    //                 this.navCtrl.pop();
    //             });
    //         }
    //         else {
    //             this.addGroup();
    //         }
    //     })
    // }

}
