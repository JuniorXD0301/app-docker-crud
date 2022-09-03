import { Component, HostBinding, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  books: any = [];

  constructor(private bookService: BooksService) { }


  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks()
      .subscribe(
        res => {
          this.books = res;
        },
        err => console.error(err)
      );
  }

  deleteBook(id: string) {
    this.bookService.deleteBook(id)
      .subscribe(
        res => {
          console.log(res);
          this.getBooks();
        },
        err => console.error(err)
      )
  }
}
