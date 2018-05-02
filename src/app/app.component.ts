import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';

import { LoginPage } from '../pages/login/login'

 const config = {
  apiKey: "AIzaSyDZWp0LGYUcjX5nogkWPGwrCCyxpBJZJXw",
  authDomain: "truescheduling-847d8.firebaseapp.com",
  databaseURL: "https://truescheduling-847d8.firebaseio.com",
  projectId: "truescheduling-847d8",
  storageBucket: "truescheduling-847d8.appspot.com",
  messagingSenderId: "536371574906"
 }

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}

