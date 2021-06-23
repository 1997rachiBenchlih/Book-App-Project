import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {

  // @ts-ignore
  book: Book;

  constructor(private route: ActivatedRoute, private booksService: BooksService,
              private router: Router) {}

  ngOnInit() {
    this.book = new Book('', '');
    const id = this.route.snapshot.params['id'];
    const liver=(book: Book) => {
                        this.book = book;
                                  }
    // @ts-ignore
    this.booksService.getSingleBook(+id).then(liver);
  }

  onBack() {
    const navigate = this.router.navigate(['/books']);
  }
}
