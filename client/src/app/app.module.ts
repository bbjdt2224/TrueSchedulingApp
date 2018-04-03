import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { SchedulePage } from '../pages/schedule/schedule';
import { NewClassPage } from '../pages/new-class/new-class';
import { ClassModalPage } from '../pages/class-modal/class-modal';
import { EditClassPage } from '../pages/edit-class/edit-class';
import { NewGroupPage } from '../pages/new-group/new-group';
import { GroupHomePage } from '../pages/group-home/group-home';
import { UserProvider } from '../providers/user/user';
import { ClassesProvider } from '../providers/classes/classes';
import { GroupsProvider } from '../providers/groups/groups';
import { Calendar } from '@ionic-native/calendar';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignUpPage,
    SchedulePage,
    NewClassPage,
    ClassModalPage,
    EditClassPage,
    NewGroupPage,
    GroupHomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignUpPage,
    SchedulePage,
    NewClassPage,
    ClassModalPage,
    EditClassPage,
    NewGroupPage,
    GroupHomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    ClassesProvider,
    GroupsProvider,
    Calendar
  ]
})
export class AppModule {}
