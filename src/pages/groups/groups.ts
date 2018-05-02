import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { NewGroupPage } from '../new-group/new-group';
import { GroupHomePage } from '../group-home/group-home';
import { GroupsProvider } from '../../providers/groups/groups';
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

    groupRelations: GroupRelation[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private groupsProvider: GroupsProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupsPage');
    this.getGroups();
  }

  ionViewDidEnter(){
      this.getGroups();
  }

  getGroups(){
    this.groupsProvider.getGroups().subscribe(relations => {this.groupRelations = relations;});
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
