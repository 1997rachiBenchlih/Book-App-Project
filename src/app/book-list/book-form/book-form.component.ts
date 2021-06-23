import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../models/book.model';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  // @ts-ignore
  bookForm: FormGroup;
  fileIsUploading = false;
  // @ts-ignore
  fileUrl: string;
  fileUploaded = false;
  constructor(private formBuilder: FormBuilder, private booksService: BooksService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      synopsis: ''
    });
  }

  onSaveBook() {
    // @ts-ignore
    const title = this.bookForm.get('title').value;
    // @ts-ignore
    const author = this.bookForm.get('author').value;
    // @ts-ignore
    const synopsis = this.bookForm.get('synopsis').value;
    const newBook = new Book(title, author);
    newBook.synopsis = synopsis;
    if(this.fileUrl && this.fileUrl !== '') {
      newBook.photo = this.fileUrl;
    }
    this.booksService.createNewBook(newBook);
    // @ts-ignore
    const booleanPromise = this.router.navigate(['/books']);
  }
  onUploadFile(file: File) {
    // @ts-ignore
    this.fileIsUploading = true;
    // @ts-ignore
    this.booksService.uploadFile(file).then( (url: string) => {
        // @ts-ignore
        this.fileUrl = url;
        // @ts-ignore
        this.fileIsUploading = false;
        // @ts-ignore
        this.fileUploaded = true;
      }
    );
  }
  // @ts-ignore
  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
}

