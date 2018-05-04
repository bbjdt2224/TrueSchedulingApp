import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewClassPage } from './new-class';

@NgModule({
  declarations: [
    NewClassPage,
  ],
  imports: [
    IonicPageModule.forChild(NewClassPage),
  ],
})
export class NewClassPageModule {}
