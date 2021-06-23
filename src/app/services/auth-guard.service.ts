import { Injectable } from '@angular/core';
import { CanActivate, Router, Navigation } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import "firebase/auth";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
console.log(firebase.auth);
@Injectable()
export class AuthGuardService implements CanActivate {


  constructor(private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if(user) {
              resolve(true);
            } else {
              this.router.navigate(['/auth', 'signin']);
              resolve(false);
            }
          }
        );
      }
    );
  }
}
