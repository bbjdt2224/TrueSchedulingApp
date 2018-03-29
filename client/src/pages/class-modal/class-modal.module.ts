import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassModalPage } from './class-modal';

@NgModule({
  declarations: [
    ClassModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ClassModalPage),
  ],
})
export class ClassModalPageModule {}
