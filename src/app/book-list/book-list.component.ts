import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book } from '../models/book.model';
import { Subscription } from 'rxjs/Subscription';
import { Router} from '@angular/router';
//import {CanActivate} from '@angular/router';
//import * as firebase from 'firebase';
import firebase from 'firebase/app';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  // @ts-ignore
  books: Book[];
  // @ts-ignore
  booksSubscription: Subscription;
  book: any;

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit() {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.booksService.emitBooks();
  }

  onNewBook(){
    // @ts-ignore
    const booleanPromise = this.router.navigate(['/book/new']);
  }

  onDeleteBook(book: Book) {
    this.booksService.removeBook(book);
  }

  onViewBook(id: number) {
     // @ts-ignore
    const booleanPromise = this.router.navigate(['/books', 'view', id]);
  }

  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }

  onBack() {
  }
  removeBook(book: Book) {
    if(book.photo) {
      // @ts-ignore
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        // @ts-ignore
        (error: any) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
    // @ts-ignore
    const element=(book2)=>{if(book2 === book) {return true;}}
    const bookIndexToRemove = this.books.findIndex(element);
    this.books.splice(bookIndexToRemove, 1);
    // @ts-ignore
    this.saveBooks();
    // @ts-ignore
    this.emitBooks();
  }

}
