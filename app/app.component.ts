import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Your web app's Firebase configuration
      var firebaseConfig = {
        apiKey: "AIzaSyCmF_dRx2CGfy8IJoSfAGg3mjSzEay22Kg",
        authDomain: "skippyq-64590.firebaseapp.com",
        databaseURL: "https://skippyq-64590.firebaseio.com",
        projectId: "skippyq-64590",
        storageBucket: "skippyq-64590.appspot.com",
        messagingSenderId: "231202822108",
        appId: "1:231202822108:web:526d8b681a6ea5ad576119"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
    });
  }
}
