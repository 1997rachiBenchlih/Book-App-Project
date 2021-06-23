import { Injectable } from '@angular/core';
//import * as firebase from 'firebase';
//Firebase App (the core Firebase SDK) is always required and must be listed first
// Add the Firebase products that you want to use
import "firebase/auth";
//console.log(firebase.auth);
import firebase from "firebase/app";
import "firebase/database";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  //Créer un nouveau utilisateur
    createNewUser(email: string, password: string)
    {
      return new Promise <void>(
        (resolve, reject) => {
          // @ts-ignore
          firebase.auth().createUserWithEmailAndPassword(email, password).then(
            () => {
              resolve();
            },
            (error: any) => {
              reject(error);
            }
          );
        }
      );
    }

    //Connexion d'un utilisateur déja exist
    signInUser(email: string, password: string)
    {
      return new Promise<void>(
        (resolve, reject) => {
          // @ts-ignore
          // @ts-ignore
          firebase.auth().signInWithEmailAndPassword(email, password).then(
            () => {
              resolve();
            },
            (error: any) => {
              reject(error);
            }
          );
        }
      );
    }
    //Déconnexion de l'utilisateur
    signOutUser()
    {
      // @ts-ignore
      firebase.auth().signOut();
    }
  }
