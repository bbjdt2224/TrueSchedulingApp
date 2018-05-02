import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupHomePage } from './group-home';

@NgModule({
  declarations: [
    GroupHomePage,
  ],
  imports: [
    IonicPageModule.forChild(GroupHomePage),
  ],
})
export class GroupHomePageModule {}
