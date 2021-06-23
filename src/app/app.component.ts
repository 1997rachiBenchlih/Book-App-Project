import { Component } from '@angular/core';
//import * as firebase from 'firebase';
import firebase from "firebase/app";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BookAppProject';
  constructor() {
    // Your web app's Firebase configuration
    var config = {
      apiKey: "AIzaSyB9eTmm2gDp46KUgs-jAeggzKkS-49__K0",
      authDomain: "bookappproject-99874.firebaseapp.com",
      projectId: "bookappproject-99874",
      storageBucket: "bookappproject-99874.appspot.com",
      messagingSenderId: "231217471848",
      appId: "1:231217471848:web:f10cdeb5c9dd5f97f536dd"
    };
    // Initialize Firebase
    firebase.initializeApp(config);
  }

}
